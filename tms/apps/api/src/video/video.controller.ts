import { Body, Controller, Get, Headers, Param, Post, Put, Query, Req, Res, UseGuards } from "@nestjs/common";
import { VideoService } from "./video.service";
import { Video } from "./video.entity";
import { CreateVideoDto, testQuestionSetRand, VideoQueryDto } from "./video.dto";
import { type DeepPartial } from "typeorm";
import { IsAdmin, JwtAuthGuard, VerifyUser } from "src/auth/auth.guard";
import { TestService } from "src/test/test.service";
import { Test, TestQuestion } from "src/test/test.entity";


@UseGuards(JwtAuthGuard, VerifyUser, IsAdmin)
@Controller('videos')
export class VideoController {

    constructor(private readonly videoService: VideoService, private readonly testService: TestService) { }

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

    @Post()
    async create(@Body() createVideoDto: CreateVideoDto): Promise<Video> {
        const video = await this.videoService.create({ ...createVideoDto, videoDuration: 0, thumbnailUrl: '' });

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
