import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Training } from "./training.entity";
import { TrainingService } from "./training.service";
import { TrainingController } from "./training.controller";
import { AuthModule } from "src/auth/auth.module";


@Module({
    imports: [TypeOrmModule.forFeature([Training]), AuthModule],
    controllers: [TrainingController],
    providers: [TrainingService],
    exports: [TrainingService]
})
export class TrainingModule {}
