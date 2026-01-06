import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { type DeepPartial, Repository } from "typeorm";
import { UserTraining } from "./usertraining.entity";
import { throwSe } from "src/common/exception/exception.util";
import { CreateUserTrainingDto, UserTrainingQueryDto } from "./usertraining.dto";
import { Messages } from "src/common/constants";
import { TrainingService } from "src/training/training.service";
import { Training } from "src/training/training.entity";
import { reduceCollection } from "src/common/util";
import { VideoService } from "src/video/video.service";


@Injectable()
export class UserTrainingService {

    constructor(
        @InjectRepository(UserTraining) private readonly userTrainingRepository: Repository<UserTraining>,
        private readonly trainingService: TrainingService,
        private readonly videoService: VideoService
    ) { }

    async findAll(query: UserTrainingQueryDto) {
        const queryBuilder = this.userTrainingRepository.createQueryBuilder('UserTraining');

        queryBuilder.leftJoinAndSelect("UserTraining.training", "training");

        queryBuilder.limit(query.pageSize).offset(query.pageIndex * query.pageSize);

        queryBuilder.where("UserTraining.userTrainingId IS NOT NULL");
        if (query.userIdFilter !== undefined) queryBuilder.andWhere("UserTraining.userId = :userId", { userId: query.userIdFilter });

        queryBuilder.addOrderBy(`UserTraining.${query.sortBy}`, query.sortDirection);

        const [result, resultCount] = await queryBuilder.getManyAndCount();

        return {
            data: Object.values(Object.fromEntries(reduceCollection(
                result,
                ut => ut.training.trainingId,
                ut => ({ ...ut.training, trainingId: ut.userTrainingId, users: [{ userId: ut.userId, progress: ut.progress }] }),
                (existing, incoming) => ({ ...existing, users: [...existing.users, ...incoming.users] })
            ))),
            pageIndex: query.pageIndex,
            pageSize: query.pageSize,
            pageCount: Math.ceil(resultCount / query.pageSize),
            resultCount,
            sortBy: query.sortBy,
            sortDirection: query.sortDirection,
            userIdFilter: query.userIdFilter,
            // nameFilter: query.nameFilter || null,
            statusFilter: query.statusFilter
        };
    }

    async findOne(id: number, userId?: number) {
        const userTraining = await this.userTrainingRepository.findOne({ where: { userTrainingId: id, userId }, relations: { training: true } });

        if (!userTraining) {
            throw new NotFoundException(Messages.MSG10_EX('UserTraining'));
        }

        const ut = { ...userTraining };
        return { ...ut.training, videos: await this.videoService.lookupVideos(userTraining?.training.videos), trainingId: ut.userTrainingId, users: [{ userId: ut.userId, progress: ut.progress }] };
    }

    async create(createUserTrainingDto: CreateUserTrainingDto): Promise<Training> {
        const training = await this.trainingService.create(createUserTrainingDto);

        const userTrainings = createUserTrainingDto.users.map(id => ({
            userId: id, trainingId: training.trainingId, progress: []
        }));

        await this.userTrainingRepository.save(userTrainings);

        return training;
    }

    async save(id: number, userTraining: DeepPartial<UserTraining>) {
        await this.userTrainingRepository.existsBy({ userTrainingId: id }) || throwSe(NotFoundException);
        return await this.userTrainingRepository.save({ ...userTraining, userTrainingId: id });
    }

}
