import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { TestService } from "./test.service";
import { CreateTestDto, TestQueryDto } from "./test.dto";
import { type DeepPartial } from "typeorm";
import { IsAdmin, JwtAuthGuard, VerifyUser } from "src/auth/auth.guard";
import { Test } from "./test.entity";


@UseGuards(JwtAuthGuard, VerifyUser, IsAdmin)
@Controller('tests')
export class TestController {

    constructor(private readonly testService: TestService) { }

    @Get()
    async findAll(@Query() query: TestQueryDto) {
        return await this.testService.findAll(query);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Test> {
        return await this.testService.findOne(+id);
    }

    @Post()
    async create(@Body() createTesttDto: CreateTestDto): Promise<Test> {
        return await this.testService.create(createTesttDto);
    }

    @Put(':id')
    async save(@Param('id') id: number, @Body() test: DeepPartial<Test>) {
        return await this.testService.save(id, test);
    }

}
