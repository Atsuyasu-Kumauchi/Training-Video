import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { type DeepPartial, In, IsNull, Not, Repository } from "typeorm";
import { Video } from "./video.entity";
import { throwSe } from "src/common/exception/exception.util";
import { CreateVideoDto, type VideoMetadata, VideoQueryDto } from "./video.dto";
import { Messages } from "src/common/constants";
import * as path from 'path';
import * as fs from 'fs';
import { pipeline } from "stream/promises";


@Injectable()
export class VideoService {
    private readonly uploadDir = path.join(process.cwd(), 'public', 'static');

    constructor(@InjectRepository(Video) private readonly videoRepository: Repository<Video>) { }

    async handleUpload(req: any, fileName: string, uploadId: string): Promise<VideoMetadata> {
        const cleanId = uploadId.replace(/[\\/.]/g, '');
        const fileExt = path.extname(fileName).toLowerCase() || '.mp4';

        const filePath = path.join(this.uploadDir, `${cleanId}${fileExt}`);
        const metaPath = path.join(this.uploadDir, `${cleanId}.json`);

        try {
            await pipeline(req, fs.createWriteStream(filePath));

            const metadata: VideoMetadata = { uploadId: cleanId, fileName, fileExt, path: filePath };
            await fs.promises.writeFile(metaPath, JSON.stringify(metadata));

            return metadata;
        } catch (error) {
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            throw new InternalServerErrorException('Failed to upload video');
        }
    }

    async findVideo(uploadId: string): Promise<VideoMetadata> {
        const cleanId = uploadId.replace(/[\\/.]/g, '');
        const metaPath = path.join(this.uploadDir, `${cleanId}.json`);

        try {
            const data = await fs.promises.readFile(metaPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            throw new NotFoundException(`Upload with ID ${cleanId} not found`);
        }
    }

    async lookupVideos(videoIds: number[] = []) {
        return await this.videoRepository.find({ where: { videoId: In(videoIds) }, relations: { test: { testQuestions: true } } });
    }

    async findAll(query: VideoQueryDto) {
        const queryBuilder = this.videoRepository.createQueryBuilder('Video');

        queryBuilder.where({ status: query.statusFilter === null ? Not(IsNull()) : query.statusFilter });
        if (query.nameFilter) queryBuilder.andWhere("Video.name like :name", { name: `%${query.nameFilter}%` });
        if (query.tagsFilter?.length) queryBuilder.andWhere("Video.audienceTags ?| :tags", { tags: query.tagsFilter });

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

    async create(createVideoDto: CreateVideoDto & { videoDuration: number, thumbnailUrl: string }): Promise<Video> {
        const existingVideo = await this.videoRepository.findOne({
            where: { name: createVideoDto.name },
        });

        if (existingVideo) {
            throw new ConflictException(Messages.DUPLICAT_ENTRY("Video"));
        }

        const video = this.videoRepository.create({
            ...createVideoDto, test: { name: `Test: ${createVideoDto.name}` }
        });

        const { videoId } = await this.videoRepository.save({ ...video });
        return await this.videoRepository.findOne({ where: { videoId }, relations: { test: true } }) as Video;
    }

    async save(id: number, video: DeepPartial<Video>) {
        await this.videoRepository.existsBy({ videoId: id }) || throwSe(NotFoundException);
        return await this.videoRepository.save({ ...video, videoId: id });
    }

}
