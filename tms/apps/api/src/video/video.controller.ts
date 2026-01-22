import { Body, Controller, Get, Headers, Param, Post, Put, Query, Req, Res, UseGuards } from "@nestjs/common";
import { VideoService } from "./video.service";
import { Video } from "./video.entity";
import { CreateVideoDto, testQuestionSetRand, VideoQueryDto } from "./video.dto";
import { type DeepPartial } from "typeorm";
import { IsAdmin, JwtAuthGuard, VerifyUser } from "src/auth/auth.guard";
import { TestService } from "src/test/test.service";
import { Test, TestQuestion } from "src/test/test.entity";
import * as path from 'path';
import * as fs from 'fs';
import Ffmpeg, * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegPath from 'ffmpeg-static';
import * as ffprobe from 'ffprobe-static';
import { YouTube } from 'youtube-sr';


@UseGuards(JwtAuthGuard, VerifyUser, IsAdmin)
@Controller('videos')
export class VideoController {
    private readonly uploadDir = path.join(process.cwd(), 'public', 'static');

    constructor(private readonly videoService: VideoService, private readonly testService: TestService) {
        if (!fs.existsSync(this.uploadDir)) fs.mkdirSync(this.uploadDir, { recursive: true });
        ffmpeg.setFfmpegPath(ffmpegPath.default as any);
        ffmpeg.setFfprobePath(ffprobe.path);
    }

    @Post("uploads")
    async upload(@Req() req: Request, @Headers('x-file-name') fileName: string, @Headers('x-upload-id') uploadId: string) {
        const metadata = await this.videoService.handleUpload(req, fileName, uploadId);
        return { uploadId: metadata.uploadId, fileName: metadata.fileName, playbackUrl: `/static/${metadata.uploadId}${metadata.fileExt}` };
    }

    @Get('uploads/:uploadId')
    async getMetadata(@Param('uploadId') uploadId: string) {
        const metadata = await this.videoService.findVideo(uploadId);
        return { uploadId: metadata.uploadId, fileName: metadata.fileName, playbackUrl: `/static/${metadata.uploadId}${metadata.fileExt}` };
    }

    @Get()
    async findAll(@Query() query: VideoQueryDto) {
        return await this.videoService.findAll(query);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Video> {
        return await this.videoService.findOne(+id);
    }

    async getVideoDuration(path: string): Promise<number> {
        return new Promise((res, rej) => {
            ffmpeg.ffprobe(path, (err, data) => {
                if (err) return rej(err);
                res(data.format.duration as number);
            });
        });
    }

    async takeVideoThumbnail(videoPath: string, outputPath: string) {
        return new Promise<string>((res, rej) => {
            Ffmpeg(videoPath)
                .videoFilters('thumbnail=100')
                .frames(1)
                .on('end', () => {
                    res(outputPath);
                })
                .on('error', e => {
                    rej(e);
                })
                .save(outputPath);
        });
    }

    @Post()
    async create(@Body() createVideoDto: CreateVideoDto): Promise<Video> {
        const videoPath = path.join(this.uploadDir, createVideoDto.videoUrl.replace('/static', ''));
        const video = await this.videoService.create({
            ...createVideoDto,
            videoDuration: createVideoDto.uploadType === "file"
                ? Math.floor(await this.getVideoDuration(videoPath))
                : (await YouTube.getVideo(`https://www.youtube.com/watch?v=${createVideoDto.videoUrl}`)).duration,
            thumbnailUrl: createVideoDto.uploadType === "file"
                ? (await this.takeVideoThumbnail(videoPath, videoPath.replace(/\.[^.]*$/, ".thumb.jpg"))).replace(/.*\/public/, '')
                : (await YouTube.getVideo(`https://www.youtube.com/watch?v=${createVideoDto.videoUrl}`)).thumbnail?.url || "",
        });

        // schedule test generation
        await this.testService.save(createVideoDto.testId || video.testId, {
            ...video.test,
            testId: createVideoDto.testId,
            testQuestions: testQuestionSetRand().map(tq => ({
                question: tq.question,
                correctOption: +tq.correct_answer,
                options: tq.choices
            } as TestQuestion))
        } as DeepPartial<Test>);

        return video;
    }

    @Put(':id')
    async save(@Param('id') id: number, @Body() video: DeepPartial<Video>) {
        return await this.videoService.save(id, video);
    }

}
