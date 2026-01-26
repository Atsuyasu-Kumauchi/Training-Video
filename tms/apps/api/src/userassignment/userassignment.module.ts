import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Assignment, UserAssignment } from "./userassignment.entity";
import { TvmsConfig } from '../common/entities';
import { UserAssignmentService } from "./userassignment.service";
import { UserAssignmentController } from "./userassignment.controller";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.moduel";
import { User } from "src/user/user.entity";


@Module({
    imports: [TypeOrmModule.forFeature([UserAssignment, Assignment, User, TvmsConfig]), AuthModule, UserModule],
    controllers: [UserAssignmentController],
    providers: [UserAssignmentService],
    exports: [UserAssignmentService]
})
export class UserAssignmentModule {}
