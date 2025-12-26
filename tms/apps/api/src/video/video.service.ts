import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { type DeepPartial, Repository } from "typeorm";
import { Video } from "./video.entity";
import { throwSe } from "src/common/exception/exception.util";
import { CreateVideoDto, VideoQueryDto } from "./video.dto";
import { Messages } from "src/common/constants";


@Injectable()
export class VideoService {

    constructor(
        @InjectRepository(Video) private readonly videoRepository: Repository<Video>
    ) { }

    async findAll(query: VideoQueryDto) {
        const queryBuilder = this.videoRepository.createQueryBuilder('Video');

        queryBuilder.where({ status: query.statusFilter });
        if (query.nameFilter) queryBuilder.andWhere("Video.name like :name", { name: `%${query.nameFilter}%` });
        if (query.tagsFilter?.length) queryBuilder.andWhere("Video.audienceTags && :tags",  { tags: query.tagsFilter });

        queryBuilder.limit(query.pageSize).offset(query.pageIndex * query.pageSize);

        queryBuilder.addOrderBy(`Video.${query.sortBy}`, query.sortDirection);

        const [result, resultCount] = await queryBuilder.getManyAndCount();

        return {
            data: result,
            pageIndex: query.pageIndex,
            pageSize: query.pageSize,
            pageCount: Math.ceil(resultCount / query.pageSize),
            resultCount,
            sortBy: query.sortBy,
            sortDirection: query.sortDirection,
            tagsFilter: query.tagsFilter || null,
            nameFilter: query.nameFilter || null,
            statusFilter: query.statusFilter
        };
    }

    async findOne(id: number): Promise<Video> {
        const video = await this.videoRepository.findOne({ where: { videoId: id } });

        if (!video) {
            throw new NotFoundException(Messages.MSG10_EX('Video'));
        }

        return video;
    }

    async create(createVideoDto: CreateVideoDto): Promise<Video> {
        const existingVideo = await this.videoRepository.findOne({
            where: { name: createVideoDto.name },
        });

        if (existingVideo) {
            throw new ConflictException(Messages.MSG6);
        }

        const video = this.videoRepository.create({
            ...createVideoDto
        });

        return this.videoRepository.save({...video });
    }

    async save(id: number, video: DeepPartial<Video>) {
        await this.videoRepository.existsBy({ videoId: id }) || throwSe(NotFoundException);
        return await this.videoRepository.save({ ...video, videoId: id });
    }

}
