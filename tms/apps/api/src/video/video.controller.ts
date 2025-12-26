import { Body, Controller, Get, Headers, Param, Post, Put, Query, Req, Res, UseGuards } from "@nestjs/common";
import { VideoService } from "./video.service";
import { Video } from "./video.entity";
import { CreateVideoDto, VideoQueryDto } from "./video.dto";
import { type DeepPartial } from "typeorm";
import { IsAdmin, JwtAuthGuard, VerifyUser } from "src/auth/auth.guard";


@UseGuards(JwtAuthGuard, VerifyUser, IsAdmin)
@Controller('videos')
export class VideoController {

    constructor(private readonly videoService: VideoService) { }

    @Post()
    async upload(@Req() req: Request, @Headers('x-file-name') fileName: string, @Headers('x-upload-id') uploadId: string) {
        const metadata = await this.videoService.handleUpload(req, fileName, uploadId);
        return { uploadId: metadata.uploadId, fileName: metadata.fileName, playbackUrl: `/static/${metadata.uploadId}${metadata.fileExt}` };
    }

    @Get(':uploadId')
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
        return this.videoService.findOne(+id);
    }

    @Post()
    async create(@Body() createRoletDto: CreateVideoDto): Promise<Video> {
        return this.videoService.create(createRoletDto);
    }

    @Put(':id')
    async save(@Param('id') id: number, @Body() role: DeepPartial<Video>) {
        return await this.videoService.save(id, role);
    }

}
