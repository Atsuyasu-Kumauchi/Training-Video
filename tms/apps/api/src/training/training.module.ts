import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Training } from "./training.entity";
import { TrainingService } from "./training.service";
import { AuthModule } from "src/auth/auth.module";


@Module({
    imports: [TypeOrmModule.forFeature([Training]), AuthModule],
    providers: [TrainingService],
    exports: [TrainingService]
})
export class TrainingModule {}
