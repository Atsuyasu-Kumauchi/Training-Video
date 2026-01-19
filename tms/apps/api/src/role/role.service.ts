import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { type DeepPartial, IsNull, Not, Repository } from "typeorm";
import { Role } from "./role.entity";
import { throwSe } from "src/common/exception/exception.util";
import { CreateRoleDto, RoleQueryDto } from "./role.dto";
import { Messages } from "src/common/constants";


@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>
    ) { }

    async findAll(query: RoleQueryDto) {
        const queryBuilder = this.roleRepository.createQueryBuilder('Role');

        queryBuilder.limit(query.pageSize).offset(query.pageIndex * query.pageSize);

        queryBuilder.where({ status: query.statusFilter === undefined ? Not(IsNull()) : query.statusFilter });
        if (query.nameFilter) queryBuilder.andWhere("Role.name like :name", { name: `%${query.nameFilter}%` });

        queryBuilder.addOrderBy(`Role.${query.sortBy}`, query.sortDirection);

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

    async findOne(id: number): Promise<Role> {
        const role = await this.roleRepository.findOne({ where: { roleId: id } });

        if (!role) {
            throw new NotFoundException(Messages.MSG10_EX('Role'));
        }

        return role;
    }

    async create(createRoleDto: CreateRoleDto): Promise<Role> {
        const existingRole = await this.roleRepository.findOne({
            where: { name: createRoleDto.name },
        });

        if (existingRole) {
            throw new ConflictException(Messages.DUPLICAT_ENTRY("Role"));
        }

        const role = this.roleRepository.create({
            ...createRoleDto,
        });

        return this.roleRepository.save(role);
    }

    async save(id: number, role: DeepPartial<Role>) {
        await this.roleRepository.existsBy({ roleId: id }) || throwSe(NotFoundException);
        return await this.roleRepository.save({ ...role, roleId: id });
    }

}
