import { Controller, Get, Post, Param, Body, UseGuards, Put, Query } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentQueryDto } from "./department.dto";
import { CreateDepartmentDto } from './department.dto';
import { IsAdmin, JwtAuthGuard, VerifyUser } from 'src/auth/auth.guard';
import { Department } from './department.entity';
import { type DeepPartial } from 'typeorm';


@UseGuards(JwtAuthGuard, VerifyUser, IsAdmin)
@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  async findAll(@Query() query: DepartmentQueryDto) {
    return await this.departmentService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Department> {
    return await this.departmentService.findOne(+id);
  }

  @Post()
  async create(@Body() createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return await this.departmentService.create(createDepartmentDto);
  }

  @Put(':id')
  async save(@Param('id') id: number, @Body() department: DeepPartial<Department>) {
    return await this.departmentService.save(id, department);
  }
}
