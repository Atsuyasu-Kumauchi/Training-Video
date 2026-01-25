import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Messages } from "src/common/constants";
import { throwSe } from "src/common/exception/exception.util";
import { reduceCollection } from "src/common/util";
import { CreateTrainingDto } from "src/training/training.dto";
import { Training } from "src/training/training.entity";
import { TrainingService } from "src/training/training.service";
import { VideoService } from "src/video/video.service";
import { In, Repository } from "typeorm";
import { CreateUserTrainingDto, UserTrainingQueryDto } from "./usertraining.dto";
import { UserTraining } from "./usertraining.entity";


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

        queryBuilder.take(query.pageSize).skip(query.pageIndex * query.pageSize);

        if (query.statusFilter === null) queryBuilder.where("Training.status IS NOT NULL");
        else queryBuilder.where("Training.status = :status", { status: query.statusFilter });

        if (query.userIdFilter !== undefined) queryBuilder.andWhere("UserTraining.userId = :userId", { userId: query.userIdFilter });
        if (query.nameFilter !== undefined) queryBuilder.andWhere("Training.name like :name", { name: `%${query.nameFilter}%` });

        queryBuilder.addOrderBy(`UserTraining.${query.sortBy}`, query.sortDirection);

        const [result, resultCount] = await queryBuilder.getManyAndCount();

        return {
            data: Object.values(Object.fromEntries(reduceCollection(
                result,
                ut => ut.training.trainingId,
                ut => ({ ...ut.training, userTrainingId: ut.userTrainingId, users: [{ userId: ut.userId, progress: ut.progress }] }),
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
        return { ...ut.training, videos, userTrainingId: ut.userTrainingId, users: [{ userId: ut.userId, progress: userTraining.progress }] };
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
        userTraining.progress.forEach((p, i) => p[trainingProgress.videoId] && userTraining.progress.splice(i, 1));
        userTraining.progress.push({ [trainingProgress.videoId]: trainingProgress.progress });
        return await this.userTrainingRepository.save(userTraining);
    }
}
