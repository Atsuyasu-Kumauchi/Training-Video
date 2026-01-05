import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { type DeepPartial, Repository } from "typeorm";
import { Training } from "./training.entity";
import { throwSe } from "src/common/exception/exception.util";
import { CreateTrainingDto, TrainingQueryDto } from "./training.dto";
import { Messages } from "src/common/constants";


@Injectable()
export class TrainingService {

    constructor(
        @InjectRepository(Training) private readonly trainingRepository: Repository<Training>
    ) { }

    async findAll(query: TrainingQueryDto) {
        const queryBuilder = this.trainingRepository.createQueryBuilder('Training');

        queryBuilder.limit(query.pageSize).offset(query.pageIndex * query.pageSize);

        queryBuilder.where({ status: query.statusFilter });
        if (query.nameFilter) queryBuilder.andWhere("Training.name like :name", { name: `%${query.nameFilter}%` });

        queryBuilder.addOrderBy(`Training.${query.sortBy}`, query.sortDirection);

        const [result, resultCount] = await queryBuilder.getManyAndCount();

        return {
            data: result,
            pageIndex: query.pageIndex,
            pageSize: query.pageSize,
            pageCount: Math.ceil(resultCount / query.pageSize),
            resultCount,
            sortBy: query.sortBy,
            sortDirection: query.sortDirection,
            nameFilter: query.nameFilter || null,
            statusFilter: query.statusFilter
        };
    }

    async findOne(id: number): Promise<Training> {
        const training = await this.trainingRepository.findOne({ where: { trainingId: id } });

        if (!training) {
            throw new NotFoundException(Messages.MSG10_EX('Training'));
        }

        return training;
    }

    async create(createTrainingDto: CreateTrainingDto): Promise<Training> {
        const existingTraining = await this.trainingRepository.findOne({
            where: { name: createTrainingDto.name },
        });

        if (existingTraining) {
            throw new ConflictException(Messages.MSG6);
        }

        const training = this.trainingRepository.create({
            ...createTrainingDto,
        });

        return this.trainingRepository.save(training);
    }

    async save(id: number, training: DeepPartial<Training>) {
        await this.trainingRepository.existsBy({ trainingId: id }) || throwSe(NotFoundException);
        return await this.trainingRepository.save({ ...training, trainingId: id });
    }

}
