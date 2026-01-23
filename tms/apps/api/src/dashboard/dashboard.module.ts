import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { User } from '../user/user.entity';
import { Training } from '../training/training.entity';
import { Video } from '../video/video.entity';
import { UserTraining } from '../usertraining/usertraining.entity';
import { Test } from '../test/test.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([User, Training, Video, UserTraining, Test]),
		AuthModule,
	],
	controllers: [DashboardController],
	providers: [DashboardService],
	exports: [DashboardService],
})
export class DashboardModule {}
