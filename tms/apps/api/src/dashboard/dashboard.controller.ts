import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardStatsDto, StudentDashboardStatsDto } from './dashboard.dto';
import { JwtAuthGuard, VerifyUser, IsAdmin } from 'src/auth/auth.guard';

@UseGuards(JwtAuthGuard, VerifyUser, IsAdmin)
@Controller('dashboard')
export class DashboardController {
	constructor(private readonly dashboardService: DashboardService) {}

	@Get('stats')
	async getStats(): Promise<DashboardStatsDto> {
		return await this.dashboardService.getDashboardStats();
	}
}

@UseGuards(JwtAuthGuard, VerifyUser)
@Controller('dashboard')
export class StudentDashboardController {
	constructor(private readonly dashboardService: DashboardService) {}

	@Get('student/stats')
	async getStudentStats(@Req() req): Promise<StudentDashboardStatsDto> {
		return await this.dashboardService.getStudentDashboardStats(req.user.userId);
	}
}
