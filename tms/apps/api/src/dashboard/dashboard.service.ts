import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Training } from '../training/training.entity';
import { Video } from '../video/video.entity';
import { UserTraining } from '../usertraining/usertraining.entity';
import { Test } from '../test/test.entity';
import { DashboardStatsDto, RecentActivityItem } from './dashboard.dto';

@Injectable()
export class DashboardService {
	constructor(
	@InjectRepository(User)
	private readonly userRepository: Repository<User>,
	@InjectRepository(Training)
	private readonly trainingRepository: Repository<Training>,
	@InjectRepository(Video)
	private readonly videoRepository: Repository<Video>,
	@InjectRepository(UserTraining)
	private readonly userTrainingRepository: Repository<UserTraining>,
	@InjectRepository(Test)
	private readonly testRepository: Repository<Test>,
	) {}

	async getDashboardStats(): Promise<DashboardStatsDto> {
	// Get total users count (only active users)
	const totalUsers = await this.userRepository.count({
		where: { status: true },
	});

	// Get active trainings count (only active trainings)
	const activeTrainings = await this.trainingRepository.count({
		where: { status: true },
	});

	// Get total videos count (only active videos)
	const totalVideos = await this.videoRepository.count({
		where: { status: true },
	});

	// Get recent activity
	const recentActivity = await this.getRecentActivity();

	return {
		totalUsers,
		activeTrainings,
		totalVideos,
		recentActivity,
	};
	}

  private async getRecentActivity(): Promise<RecentActivityItem[]> {
    const activities: RecentActivityItem[] = [];
    const limit = 5; // Get last 5 activities

    // Get recently registered users (limit to 2 for better distribution)
    const recentUsers = await this.userRepository.find({
      where: { status: true },
      order: { created: 'DESC' },
      take: 2,
      select: ['userId', 'firstName', 'lastName', 'created'],
    });

	recentUsers.forEach((user) => {
		activities.push({
		type: 'user_registered',
		title: '新規ユーザー登録',
		description: `${user.firstName} ${user.lastName}さんがプラットフォームに参加しました。`,
		timestamp: user.created,
		});
	});

    // Get recently completed trainings (limit to 2 for better distribution)
    const recentCompletedTrainings = await this.userTrainingRepository.find({
      order: { modified: 'DESC' },
      take: 2,
      relations: ['user', 'training'],
		select: {
		userTrainingId: true,
		modified: true,
		user: {
			userId: true,
			firstName: true,
			lastName: true,
		},
		training: {
			trainingId: true,
			name: true,
		},
		},
	});

	recentCompletedTrainings.forEach((userTraining) => {
		if (userTraining.user && userTraining.training) {
		activities.push({
			type: 'training_completed',
			title: 'トレーニング完了',
			description: `${userTraining.user.firstName} ${userTraining.user.lastName}さんが「${userTraining.training.name}」を完了しました。`,
			timestamp: userTraining.modified,
		});
		}
	});

    // Get recently uploaded videos (limit to 1 for better distribution)
    const recentVideos = await this.videoRepository.find({
      where: { status: true },
      order: { created: 'DESC' },
      take: 1,
      select: ['videoId', 'name', 'created'],
    });

	recentVideos.forEach((video) => {
		activities.push({
		type: 'video_uploaded',
		title: '新しい動画がアップロードされました',
		description: `「${video.name}」がライブラリに追加されました。`,
		timestamp: video.created,
		});
	});

    // Get recently created tests (limit to 1 for better distribution)
    const recentTests = await this.testRepository.find({
      where: { status: true },
      order: { created: 'DESC' },
      take: 1,
      select: ['testId', 'name', 'created'],
    });

	recentTests.forEach((test) => {
		activities.push({
		type: 'test_created',
		title: 'テストが作成されました',
		description: `「${test.name}」が作成されました。`,
		timestamp: test.created,
		});
	});

    // Sort all activities by timestamp (most recent first) and limit to 5
    return activities
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
	}
}
