import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
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
    const queryBuilder = this.departmentRepository.createQueryBuilder();

    queryBuilder.limit(query.pageSize).offset(query.pageIndex * query.pageSize);

    queryBuilder.where({ status: query.status })
    if (query.name) queryBuilder.andWhere("Department.name like :name", { name: `${query.name}` });

    queryBuilder.addOrderBy(`Department.${query.sortBy}`, query.sortDirection);

    // .where
    // const findOptions: FindManyOptions<Department> = {
    //   take: limit,
    //   skip: skip,
    //   // Default order, customize as needed
    //   order: { createdAt: 'DESC' }, 
    // };

    // if (query.search) {
    //   // Create a complex 'where' clause using TypeORM's 'Like' operator 
    //   // to search across multiple fields (e.g., name and email)
    //   findOptions.where = [
    //     { name: Like(`%${query.search}%`) },
    //     { email: Like(`%${query.search}%`) },
    //   ];
    // }
    
    // If you had a 'status' filter in DTO:
    // if (query.status) {
    //     findOptions.where = { ...findOptions.where, status: query.status };
    // }

    const [result, resultCount] = await queryBuilder.getManyAndCount();

    return {
      data: result,
      pageIndex: query.pageIndex,
      pageSize: query.pageSize,
      pageCount: Math.ceil(resultCount / query.pageSize),
      resultCount,
      sortBy: query.sortBy,
      sortDirection: query.sortDirection
    };
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

  save(department: Partial<Department>) {
    this.departmentRepository.existsBy({ departmentId: department.departmentId }) || throwSe(NotFoundException);
    this.departmentRepository.save(department);
  }
}
