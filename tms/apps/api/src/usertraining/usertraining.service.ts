import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { type DeepPartial, In, IsNull, Not, Repository } from "typeorm";
import { UserTraining } from "./usertraining.entity";
import { throwSe } from "src/common/exception/exception.util";
import { CreateUserTrainingDto, UserTrainingQueryDto } from "./usertraining.dto";
import { Messages } from "src/common/constants";
import { TrainingService } from "src/training/training.service";
import { Training } from "src/training/training.entity";
import { reduceCollection } from "src/common/util";
import { VideoService } from "src/video/video.service";
import { CreateTrainingDto } from "src/training/training.dto";


@Injectable()
export class UserTrainingService {

    constructor(
        @InjectRepository(UserTraining) private readonly userTrainingRepository: Repository<UserTraining>,
        private readonly trainingService: TrainingService,
        private readonly videoService: VideoService
    ) { }

    async findAllTrainigs(query: UserTrainingQueryDto) {
        const queryBuilder = this.userTrainingRepository.createQueryBuilder('UserTraining');

        queryBuilder.leftJoinAndSelect("UserTraining.training", "Training");

        queryBuilder.take(query.pageSize).offset(query.pageIndex * query.pageSize);

        if (query.statusFilter === null) queryBuilder.where("Training.status IS NOT NULL");
        else queryBuilder.where("Training.status = :status", { status: query.statusFilter });

        if (query.userIdFilter !== undefined) queryBuilder.andWhere("UserTraining.userId = :userId", { userId: query.userIdFilter });
        if (query.nameFilter !== undefined) queryBuilder.andWhere("Training.name like :name", { name: `%${query.nameFilter}%` });

        queryBuilder.addOrderBy(`UserTraining.${query.sortBy}`, query.sortDirection);

        const [result, resultCount] = await queryBuilder.getManyAndCount();

        const fakedProgress = ut => [...(ut.progress && []), ...ut.training.videos.map(v => ({ [v]: Math.random() * 10 > 5 }))];

        return {
            data: Object.values(Object.fromEntries(reduceCollection(
                result,
                ut => ut.training.trainingId,
                ut => ({ ...ut.training, trainingId: ut.userTrainingId, users: [{ userId: ut.userId, progress: fakedProgress(ut) }] }),
                (existing, incoming) => ({ ...existing, users: [...existing.users, ...incoming.users] })
            ))),
            pageIndex: query.pageIndex,
            pageSize: query.pageSize,
            pageCount: Math.ceil(resultCount / query.pageSize),
            resultCount,
            sortBy: query.sortBy,
            sortDirection: query.sortDirection,
            userIdFilter: query.userIdFilter || null,
            nameFilter: query.nameFilter || null,
            statusFilter: query.statusFilter
        };
    }

    async findOneTraining(trainingId: number, userId?: number) {
        const userTraining = await this.userTrainingRepository.findOne({ where: { trainingId, userId }, relations: { training: true } });

        if (!userTraining) {
            throw new NotFoundException(Messages.MSG10_EX('UserTraining'));
        }

        const ut = { ...userTraining };
        const videos = await this.videoService.lookupVideos(userTraining?.training.videos);
        const fakedProgress = [...(ut.progress && []), ...videos.map(v => ({ [v.videoId]: Math.random() * 10 > 5 }))];
        return { ...ut.training, videos, trainingId: ut.userTrainingId, users: [{ userId: ut.userId, progress: fakedProgress }] };
    }

    async createUserTraining(createUserTrainingDto: CreateUserTrainingDto): Promise<Training> {
        const training = await this.trainingService.create(createUserTrainingDto as CreateTrainingDto);

        const userTrainings = createUserTrainingDto.users.map(userId => ({
            userId, trainingId: training.trainingId, progress: []
        }));

        await this.userTrainingRepository.save(userTrainings);

        return training;
    }

    async saveUserTraining(trainingId: number, createUserTrainingDto: CreateUserTrainingDto & { progress: any[] }): Promise<Training> {
        const existingUserTrainings = Object.fromEntries(
            (await this.userTrainingRepository.find({ where: { userId: In(createUserTrainingDto.users), trainingId } }))
                .map(ut => [ut.userId, ut])
        );

        const userTrainings = createUserTrainingDto.users.map(userId => ({
            userId, trainingId, progress: existingUserTrainings[userId]?.progress
        }));

        await this.userTrainingRepository.save(userTrainings);

        return await this.trainingService.save(trainingId, { ...(createUserTrainingDto as CreateTrainingDto) });
    }

    async saveUserTrainigProgress(userId: any, trainingId: number, trainingProgress: { videoId: number, progress: any }) {
        const userTraining = await this.userTrainingRepository.findOne({ where: { userId, trainingId } }) || throwSe(NotFoundException);
        userTraining.progress.forEach((p, i) => {
            if (p[trainingProgress.videoId]) delete userTraining.progress[i];
                p[trainingProgress.videoId] = trainingProgress.progress;
        });
        userTraining.progress.push({ [trainingProgress.videoId]: trainingProgress.progress });
        return await this.userTrainingRepository.save(userTraining);
    }
}
