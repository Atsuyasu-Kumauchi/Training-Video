import { Controller, Get, Post, Param, Body, HttpStatus, HttpCode, NotFoundException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Messages } from 'src/common/constants';
import { IsAdmin, JwtAuthGuard } from 'src/auth/auth.guard';


@UseGuards(JwtAuthGuard, IsAdmin)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findById(@Param('id') id) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(Messages.NOT_FOUND('User'));
    }
    return user;
  }

}
