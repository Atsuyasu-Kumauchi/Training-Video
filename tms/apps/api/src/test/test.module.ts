import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Test, TestQuestion } from "./test.entity";
import { TestService } from "./test.service";
import { TestController } from "./test.controller";
import { AuthModule } from "src/auth/auth.module";


@Module({
    imports: [TypeOrmModule.forFeature([Test, TestQuestion]), AuthModule],
    controllers: [TestController],
    providers: [TestService],
    exports: [TestService]
})
export class TestModule {}
