import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';
import { CreateDepartmentDto } from './department.dto';
import { Messages } from '../common/constants/messages';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department) private readonly departmentRepository: Repository<Department>
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const existingUser = await this.departmentRepository.findOne({
      where: { name: createDepartmentDto.name },
    });

    if (existingUser) {
      throw new ConflictException(Messages.MSG6);
    }

    const department = this.departmentRepository.create({
      ...createDepartmentDto,
    });

    return this.departmentRepository.save(department);
  }

  async findAll(): Promise<Department[]> {
    return this.departmentRepository.find({
      where: { status: true },
      order: { name: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { departmentId: id, status: true },
    });

    if (!department) {
      throw new NotFoundException(Messages.MSG10);
    }

    return department;
  }

  async remove(id: number): Promise<void> {
    const department = await this.findOne(id);
    await this.departmentRepository.remove(department);
  }
}
