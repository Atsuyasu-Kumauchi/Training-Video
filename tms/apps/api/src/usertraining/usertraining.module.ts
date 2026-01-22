import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserTraining } from "./usertraining.entity";
import { UserTrainingService } from "./usertraining.service";
import { AuthModule } from "src/auth/auth.module";
import { UserTrainingController } from "./usertraining.controller";
import { TrainingModule } from "src/training/training.module";
import { VideoModule } from "src/video/video.module";


@Module({
    imports: [TypeOrmModule.forFeature([UserTraining]), AuthModule, TrainingModule, VideoModule],
    controllers: [UserTrainingController],
    providers: [UserTrainingService],
    exports: [UserTrainingService],
})
export class UserTrainingModule { }
