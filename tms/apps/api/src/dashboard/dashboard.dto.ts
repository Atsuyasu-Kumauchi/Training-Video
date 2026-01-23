export class DashboardStatsDto {
	totalUsers: number;
	activeTrainings: number;
	totalVideos: number;
	recentActivity: RecentActivityItem[];
}

export class RecentActivityItem {
	type: 'user_registered' | 'training_completed' | 'video_uploaded' | 'test_created';
	title: string;
	description: string;
	timestamp: Date;
}
