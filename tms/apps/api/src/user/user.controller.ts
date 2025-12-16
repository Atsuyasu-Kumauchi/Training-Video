import { Controller, Get, Post, Put, Param, Body, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { IsAdmin, JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto, UserQueryDto } from './user.dto';
import { User } from 'src/common/entities/user.entity';
import { type DeepPartial } from 'typeorm';


@UseGuards(JwtAuthGuard, IsAdmin)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query() query: UserQueryDto) {
    return await this.userService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(+id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  async save(@Param('id') id: number, @Body() user: DeepPartial<User>) {
    return await this.userService.save(id, user);
  }
}
