import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Assignment } from "./userassignment.entity";
import { UserAssignmentService } from "./userassignment.service";
import { UserAssignmentController } from "./userassignment.controller";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.moduel";


@Module({
    imports: [TypeOrmModule.forFeature([Assignment]), AuthModule, UserModule],
    controllers: [UserAssignmentController],
    providers: [UserAssignmentService],
    exports: [UserAssignmentService]
})
export class UserAssignmentModule {}
