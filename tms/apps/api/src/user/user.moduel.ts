import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserTraining } from 'src/usertraining/usertraining.entity';
import { Training } from 'src/training/training.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User, UserTraining, Training]), AuthModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
