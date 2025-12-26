import { BadRequestException, Body, Controller, Get, Param, Post, Put, Query, Req, Res, UseGuards } from "@nestjs/common";
import { VideoService } from "./video.service";
import { Video } from "./video.entity";
import { CreateVideoDto, VideoQueryDto } from "./video.dto";
import { type DeepPartial } from "typeorm";
import { IsAdmin, JwtAuthGuard, VerifyUser } from "src/auth/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { tmpdir } from "os";


@UseGuards(JwtAuthGuard, VerifyUser, IsAdmin)
@Controller('videos')
export class VideoController {

    constructor(private readonly videoService: VideoService) { }

    @Post("upload")
    async uploadVideo(@Req() req: Request) {
        const contentType = req.headers['content-type'] || '';
        let extension = '';
        if (contentType.includes('mp4')) extension = '.mp4';
        else if (contentType.includes('webm')) extension = '.webm';
        else if (contentType.includes('ogg')) extension = '.ogg';
        else extension = ''; // fallback, no extension

        // const result = await this.videoUploadService.saveFile(req, 'video' + extension);
        return {
            // uploadId: result.uploadId,
            // fileName: result.fileName,
        };
    }

    // GET /video-uploads/:uploadId
    @Get(':uploadId')
    async getVideo(@Param('uploadId') uploadId: string, @Res() res: Response) {
        // const video = this.videoUploadService.findOne(uploadId);
        // if (!video) {
        //     throw new BadRequestException('Upload not found');
        // }

        // const filePath = this.videoUploadService.getFilePath(video.fileName);
        // const fileStream = fs.createReadStream(filePath);

        // res.setHeader('Content-Disposition', `attachment; filename="${video.fileName}"`);
        // fileStream.pipe(res);
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
