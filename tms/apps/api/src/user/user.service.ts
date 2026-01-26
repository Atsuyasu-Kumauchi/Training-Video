import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeepPartial, IsNull, Not, Repository } from 'typeorm';
import { User } from './user.entity';
import { Messages } from '../common/constants/messages';
import { CreateUserDto, UserQueryDto } from './user.dto';
import { AuthService } from 'src/auth/auth.service';
import { throwSe } from 'src/common/exception/exception.util';
import { Tag } from 'src/tag/tag.entity';
import { UserTraining } from 'src/usertraining/usertraining.entity';
import { Training } from 'src/training/training.entity';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserTraining) private readonly userTrainingRepository: Repository<UserTraining>,
    @InjectRepository(Training) private readonly trainingRepository: Repository<Training>,
    private readonly authService: AuthService
  ) {}

  async findAll(query: UserQueryDto) {
    const queryBuilder = this.userRepository.createQueryBuilder('User');

    queryBuilder.leftJoin('User.role', 'Role').addSelect(['Role.roleId', 'Role.name']);
    queryBuilder.leftJoin('User.department', 'Department').addSelect(['Department.departmentId', 'Department.name']);
    queryBuilder.leftJoin('User.tags', 'Tag').addSelect(['Tag.tagId', 'Tag.name']);

    queryBuilder.take(query.pageSize).skip(query.pageIndex * query.pageSize);

    queryBuilder.where({ status: query.statusFilter === null ? Not(IsNull()) : query.statusFilter });
    if (query.simplenameFilter) {
      queryBuilder.andWhere(new Brackets(qb => {
        qb.where("User.username like :username", { username: `%${query.simplenameFilter}%` })
          .orWhere("User.email like :email", { email: `%${query.simplenameFilter}`});
      }));
    }
    if (query.departmentIdFilter) queryBuilder.where("User.departmentId = :departmentId", { departmentId: query.departmentIdFilter });

    queryBuilder.addOrderBy(`User.${query.sortBy}`, query.sortDirection);

    const [result, resultCount] = await queryBuilder.getManyAndCount();

    return {
      data: result.map(u => {
        const user = u as any;
        user.userTagIds = user.tags.map((t: Tag) => t.tagId);
        return user;
      }),
      pageIndex: query.pageIndex,
      pageSize: query.pageSize,
      pageCount: Math.ceil(resultCount / query.pageSize),
      resultCount,
      sortBy: query.sortBy,
      sortDirection: query.sortDirection,
      departmentIdFilter: query.departmentIdFilter || null,
      simplenameFilter: query.simplenameFilter || null,
      statusFilter: query.statusFilter
    };
  }

  async findOne(id: number): Promise<User & { userTagIds: number[], assigned_training: number, completed_training: number }> {
    const user = await this.userRepository.findOne({ where: { userId: id }, relations: { tags: true } }) as any;
    user.userTagIds = user.tags.map((t: Tag) => t.tagId);

    if (!user) {
      throw new NotFoundException(Messages.MSG10_EX('User'));
    }

    // Get all user trainings with training relations (assigned trainings)
    const userTrainings = await this.userTrainingRepository.find({
      where: { userId: id },
      relations: { training: true }
    });

    const assignedTrainingCount = userTrainings.length;

    // Count completed trainings (where all videos are completed)
    const completedTrainingCount = userTrainings.filter(userTraining => {
      return this.isTrainingCompleted(userTraining);
    }).length;

    return {
      ...user,
      assigned_training: assignedTrainingCount,
      completed_training: completedTrainingCount
    };
  }

  async create<T extends CreateUserDto>(createUserDto: T): Promise<User & { userTags: number[] }> {
    if (await this.userRepository.existsBy({ username: createUserDto.username })) {
      throw new ConflictException(Messages.DUPLICAT_ENTRY('メールアドレス'));
    }

    if (await this.userRepository.existsBy({ employeeId: createUserDto.employeeId })) {
      throw new ConflictException(Messages.DUPLICAT_ENTRY('従業員ID'));
    }

    const user = await this.authService.createAuthUser(createUserDto, false, true);
    user.tags = createUserDto.userTagIds.map(t => ({ tagId: t } as Tag));
    // Explicitly set reviewers field to ensure it's saved as JSONB array
    user.reviewers = Array.isArray(createUserDto.reviewers) ? createUserDto.reviewers : [];
    return { ...(await this.userRepository.save(user) as any), tags: undefined, userTags: createUserDto.userTagIds } ;
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

  async save(id: number, user: DeepPartial<User>, userTags: number[]) {
    await this.userRepository.existsBy({ userId: id }) || throwSe(NotFoundException);
    await this.authService.updateAuthUser(user);
    user.tags = userTags.map(t => ({ tagId: t } as Tag));
    // Ensure reviewers field is properly set if provided
    if (user.reviewers !== undefined) {
      user.reviewers = Array.isArray(user.reviewers) ? user.reviewers : [];
    }
    return await this.userRepository.save({ ...user, userId: id });
  }

}
