import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Video } from "./video.entity";
import { VideoService } from "./video.service";
import { VideoController } from "./video.controller";
import { AuthModule } from "src/auth/auth.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import path from "path";


@Module({
    imports: [TypeOrmModule.forFeature([Video]), AuthModule, ServeStaticModule.forRoot({ rootPath: path.join(process.cwd(), 'public', 'static'), serveRoot: '/static' })],
    controllers: [VideoController],
    providers: [VideoService],
    exports: [VideoService]
})
export class VideoModule {}
