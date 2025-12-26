import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { type DeepPartial, Repository } from 'typeorm';
import { Department } from './department.entity';
import { CreateDepartmentDto, DepartmentQueryDto } from './department.dto';
import { Messages } from '../common/constants/messages';
import { throwSe } from 'src/common/exception/exception.util';


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

  async findAll(query: DepartmentQueryDto) {
    const queryBuilder = this.departmentRepository.createQueryBuilder('Department');

    queryBuilder.limit(query.pageSize).offset(query.pageIndex * query.pageSize);

    queryBuilder.where({ status: query.statusFilter });
    if (query.nameFilter) queryBuilder.andWhere("Department.name like :name", { name: `%${query.nameFilter}%` });

    queryBuilder.addOrderBy(`Department.${query.sortBy}`, query.sortDirection);

    const [result, resultCount] = await queryBuilder.getManyAndCount();

    return {
      data: result,
      pageIndex: query.pageIndex,
      pageSize: query.pageSize,
      pageCount: Math.ceil(resultCount / query.pageSize),
      resultCount,
      sortBy: query.sortBy,
      sortDirection: query.sortDirection,
      nameFilter: query.nameFilter || null,
      statusFilter: query.statusFilter
    };
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne({ where: { departmentId: id } });

    if (!department) {
      throw new NotFoundException(Messages.MSG10);
    }

    return department;
  }

  async remove(id: number): Promise<void> {
    const department = await this.findOne(id);
    await this.departmentRepository.remove(department);
  }

  async save(id: number, department: DeepPartial<Department>) {
    await this.departmentRepository.existsBy({ departmentId: id }) || throwSe(NotFoundException);
    return await this.departmentRepository.save({ ...department, departmentId: id });
  }
}
