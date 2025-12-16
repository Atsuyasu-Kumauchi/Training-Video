import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartmentModule } from './department/department.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { PublicHttpExceptionFilter } from './common/exception/PublicHttpExceptionFilter';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.moduel';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [
        () => ({
          appname: process.env.APPNAME || 'com.offproapp.tvs',
          secretkey: process.env.SECRET_KEY || 'OPEN_SECRET',
          verify_signup: process.env.VERIFY_SIGNUP || false
        })
      ]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('NODE_ENV') === 'development', // Only in development
        logging: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    DepartmentModule,
    AuthModule,
    RoleModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_FILTER, useClass: PublicHttpExceptionFilter }],
})
export class AppModule {}
