import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Training } from '../training/training.entity';
import { Video } from '../video/video.entity';
import { UserTraining } from '../usertraining/usertraining.entity';
import { Test } from '../test/test.entity';
import { DashboardStatsDto, RecentActivityItem, StudentDashboardStatsDto, StudentRecentActivityItem } from './dashboard.dto';

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
    const limit = 4; // Get last 4 activities

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
    });

	recentTests.forEach((test) => {
		activities.push({
		type: 'test_created',
		title: 'テストが作成されました',
		description: `「${test.name}」が作成されました。`,
		timestamp: test.created,
		});
	});

    // Sort all activities by timestamp (most recent first) and limit to 4
    return activities
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
	}

	async getStudentDashboardStats(userId: number): Promise<StudentDashboardStatsDto> {
		// Get all user trainings with training relations in a single query
		const userTrainings = await this.userTrainingRepository.find({
			where: { userId },
			relations: { training: true },
			order: { created: 'DESC' } // Order by created for recent activity
		});

		const totalTrainings = userTrainings.length;

		// Count completed and in-progress trainings
		let completedTrainings = 0;
		let inProgressTrainings = 0;

		for (const userTraining of userTrainings) {
			if (this.isTrainingCompleted(userTraining)) {
				completedTrainings++;
			} else if (this.isTrainingInProgress(userTraining)) {
				inProgressTrainings++;
			}
		}

		// Get recent activity from the already-fetched data (no additional query)
		const recentActivity = this.getStudentRecentActivityFromData(userTrainings);

		return {
			totalTrainings,
			completedTrainings,
			inProgressTrainings,
			recentActivity,
		};
	}

	/**
	 * Check if a training is completed (all videos have COMPLETED status)
	 * @param userTraining - UserTraining entity with training relation loaded
	 * @returns true if all videos in the training are completed
	 */
	private isTrainingCompleted(userTraining: UserTraining): boolean {
		const training = userTraining.training;
		
		// Early return if training or videos are missing
		if (!training || !Array.isArray(training.videos) || training.videos.length === 0) {
			return false;
		}

		const progress = userTraining.progress || [];
		
		// Build a map of video progress for O(1) lookup
		const progressMap = new Map<number, any>();
		for (const p of progress) {
			if (typeof p === 'object' && p !== null) {
				const entries = Object.entries(p);
				if (entries.length > 0) {
					const videoId = Number(entries[0][0]);
					const progressData = entries[0][1];
					progressMap.set(videoId, progressData);
				}
			}
		}

		// Extract video IDs from training.videos array
		const videoIds = training.videos.map((v: any) => {
			if (typeof v === 'number') return v;
			return v?.videoId || v?.id || null;
		}).filter((id): id is number => id !== null);

		// Check if all videos are completed
		return videoIds.length > 0 && videoIds.every((videoId: number) => {
			const progressData = progressMap.get(videoId);
			return progressData?.status === 'COMPLETED';
		});
	}

	/**
	 * Check if a training is in progress (at least one video has IN_PROGRESS status or started but not all completed)
	 * @param userTraining - UserTraining entity with training relation loaded
	 * @returns true if training has some progress but is not completed
	 */
	private isTrainingInProgress(userTraining: UserTraining): boolean {
		const training = userTraining.training;
		
		// Early return if training or videos are missing
		if (!training || !Array.isArray(training.videos) || training.videos.length === 0) {
			return false;
		}

		// If completed, it's not in progress
		if (this.isTrainingCompleted(userTraining)) {
			return false;
		}

		const progress = userTraining.progress || [];
		
		// If there's any progress, it's in progress
		if (progress.length > 0) {
			return true;
		}

		return false;
	}

	/**
	 * Get recent activity from already-fetched user trainings data (no additional query)
	 * @param userTrainings - Already fetched user trainings with training relations
	 * @returns Recent activity items
	 */
	private getStudentRecentActivityFromData(userTrainings: UserTraining[]): StudentRecentActivityItem[] {
		const activities: StudentRecentActivityItem[] = [];
		const limit = 4; // Get last 4 activities

		// Sort by created date (most recent first) for assigned trainings
		const sortedByCreated = [...userTrainings].sort((a, b) => 
			b.created.getTime() - a.created.getTime()
		);

		// Get recently assigned trainings (limit to 2)
		const recentAssignedTrainings = sortedByCreated.slice(0, 2);

		recentAssignedTrainings.forEach((userTraining) => {
			if (userTraining.training) {
				activities.push({
					type: 'training_assigned',
					title: 'トレーニング割り当て',
					description: `「${userTraining.training.name}」が割り当てられました。`,
					timestamp: userTraining.created,
				});
			}
		});

		// Sort by modified date (most recent first) for completed trainings
		const sortedByModified = [...userTrainings]
			.filter(ut => this.isTrainingCompleted(ut))
			.sort((a, b) => b.modified.getTime() - a.modified.getTime());

		// Get recently completed trainings (limit to 2)
		const recentCompletedTrainings = sortedByModified.slice(0, 2);

		recentCompletedTrainings.forEach((userTraining) => {
			if (userTraining.training) {
				activities.push({
					type: 'training_completed',
					title: 'トレーニング完了',
					description: `「${userTraining.training.name}」を完了しました。`,
					timestamp: userTraining.modified,
				});
			}
		});

		// Sort all activities by timestamp (most recent first) and limit to 4
		return activities
			.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
			.slice(0, limit);
	}
}
