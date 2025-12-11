import { Controller, Get, Post, Param, Body, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentDto } from "./department.dto";
import { CreateDepartmentDto } from './department.dto';
import { IsAdmin, JwtAuthGuard, VerifyUser } from 'src/auth/auth.guard';


@UseGuards(JwtAuthGuard, VerifyUser, IsAdmin)
@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  async findAll(): Promise<DepartmentDto[]> {
    return this.departmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DepartmentDto> {
    return this.departmentService.findOne(+id);
  }

  @Post()
  async create(@Body() createDepartmentDto: CreateDepartmentDto): Promise<DepartmentDto> {
    return this.departmentService.create(createDepartmentDto);
  }
}
