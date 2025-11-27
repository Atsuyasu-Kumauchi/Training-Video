import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Messages } from '../common/constants/messages';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async create(createUserDto: CreateDepartmentDto): Promise<Department> {
    // Check if user already exists
    const existingUser = await this.departmentRepository.findOne({
      where: { name: createUserDto.name },
    });

    if (existingUser) {
      throw new ConflictException(Messages.MSG6);
    }

    // Create user
    const user = this.departmentRepository.create({
      ...createUserDto,
    });

    return this.departmentRepository.save(user);
  }

  async findAll(): Promise<Department[]> {
    return this.departmentRepository.find({
      where: { status: true },
      order: { name: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Department> {
    const user = await this.departmentRepository.findOne({
      where: { department_id: id, status: true },
    });

    if (!user) {
      throw new NotFoundException(Messages.MSG10);
    }

    return user;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.departmentRepository.remove(user);
  }
}
