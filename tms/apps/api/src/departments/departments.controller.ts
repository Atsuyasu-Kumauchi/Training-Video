import { Controller, Get, Post, Param, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentDto } from './dto/department.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<DepartmentDto[]> {
    return this.departmentsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<DepartmentDto> {
    return this.departmentsService.findOne(+id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDepartmentDto: CreateDepartmentDto): Promise<DepartmentDto> {
    return this.departmentsService.create(createDepartmentDto);
  }
}
