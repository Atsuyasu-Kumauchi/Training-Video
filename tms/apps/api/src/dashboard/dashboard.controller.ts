import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardStatsDto } from './dashboard.dto';
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
