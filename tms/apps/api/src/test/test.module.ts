import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Test } from "./test.entity";
import { TestService } from "./test.service";
import { TestController } from "./test.controller";
import { AuthModule } from "src/auth/auth.module";


@Module({
    imports: [TypeOrmModule.forFeature([Test]), AuthModule],
    controllers: [TestController],
    providers: [TestService],
    exports: [TestService]
})
export class TestModule {}
