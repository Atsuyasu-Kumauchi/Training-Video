import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.moduel'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtActiveAuthGuard, JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('secretkey'),
        signOptions: { expiresIn: '5h' }
      })
    }),
    UserModule
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, JwtActiveAuthGuard],
  controllers: [AuthController],
  exports: [JwtAuthGuard, JwtActiveAuthGuard]
})
export class AuthModule {}
