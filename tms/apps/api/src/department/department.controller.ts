import { Controller, Get, Post, Param, Body, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentDto } from "./department.dto";
import { CreateDepartmentDto } from './department.dto';
import { JwtActiveAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @UseGuards(JwtActiveAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<DepartmentDto[]> {
    return this.departmentService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<DepartmentDto> {
    return this.departmentService.findOne(+id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDepartmentDto: CreateDepartmentDto): Promise<DepartmentDto> {
    return this.departmentService.create(createDepartmentDto);
  }
}
