import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VerifyUser, JwtAuthGuard, IsAdmin } from './auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/common/entities/user.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('secretkey'),
        signOptions: { expiresIn: '5h' }
      })
    })
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, VerifyUser, IsAdmin],
  controllers: [AuthController],
  exports: [AuthService, JwtAuthGuard, VerifyUser, IsAdmin]
})
export class AuthModule {}
