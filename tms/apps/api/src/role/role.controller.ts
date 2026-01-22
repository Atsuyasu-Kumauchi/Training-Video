import { Body, Controller, Get, HttpCode, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { RoleService } from "./role.service";
import { Role } from "./role.entity";
import { CreateRoleDto, RoleQueryDto } from "./role.dto";
import { type DeepPartial } from "typeorm";
import { IsAdmin, JwtAuthGuard, VerifyUser } from "src/auth/auth.guard";


@UseGuards(JwtAuthGuard, VerifyUser, IsAdmin)
@Controller('roles')
export class RoleController {

    constructor(private readonly roleService: RoleService) { }

    @Get()
    async findAll(@Query() query: RoleQueryDto) {
        return await this.roleService.findAll(query);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Role> {
        return await this.roleService.findOne(+id);
    }

    @Post()
    async create(@Body() createRoletDto: CreateRoleDto): Promise<Role> {
        return await this.roleService.create(createRoletDto);
    }

    @Put(':id')
    async save(@Param('id') id: number, @Body() role: DeepPartial<Role>) {
        return await this.roleService.save(id, role);
    }

}
