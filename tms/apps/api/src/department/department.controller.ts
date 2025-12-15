import { Controller, Get, Post, Param, Body, HttpStatus, HttpCode, UseGuards, Put, Query } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentDto, DepartmentQueryDto } from "./department.dto";
import { CreateDepartmentDto } from './department.dto';
import { IsAdmin, JwtAuthGuard, VerifyUser } from 'src/auth/auth.guard';
import { Department } from './department.entity';


@UseGuards(JwtAuthGuard, VerifyUser, IsAdmin)
@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  async findAll(@Query() query: DepartmentQueryDto) {
    return await this.departmentService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DepartmentDto> {
    return this.departmentService.findOne(+id);
  }

  @Post()
  async create(@Body() createDepartmentDto: CreateDepartmentDto): Promise<DepartmentDto> {
    return this.departmentService.create(createDepartmentDto);
  }

  @Put()
  async save(@Body() department: Partial<Department>) {
    return this.departmentService.save(department);
  }
}
