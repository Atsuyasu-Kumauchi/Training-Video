import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "./role.entity";
import { throwSe } from "src/common/exception/exception.util";
import { RoleNotFound } from "./role.exceptions";
import { CreateRoleDto } from "./role.dto";


@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>
    ) {}

    async findAll(): Promise<Role[]> {
        return await this.roleRepository.find({ where: { status: true } });
    }

    async create(createRoleDto: CreateRoleDto): Promise<Role> {
        const role = this.roleRepository.create({ ...createRoleDto });
        return await this.roleRepository.save(role);
    }

    async findOne(roleId: number): Promise<Role> {
        return await this.roleRepository.findOneBy({ roleId }) || throwSe(RoleNotFound);
    }

}
