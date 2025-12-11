import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common";
import { RoleService } from "./role.service";
import { Role } from "./role.entity";
import { CreateRoleDto } from "./role.dto";


@Controller('roles')
export class RoleController {

    constructor(private readonly roleService: RoleService) { }

    @Get()
    async findAll(): Promise<Role[]> {
        return this.roleService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Role> {
        return this.roleService.findOne(+id);
    }

    @Post()
    async create(@Body() createRoletDto: CreateRoleDto): Promise<Role> {
        return this.roleService.create(createRoletDto);
    }

}
