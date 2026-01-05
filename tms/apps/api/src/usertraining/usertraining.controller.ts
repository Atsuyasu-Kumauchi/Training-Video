import { Body, Controller, Get, HttpCode, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UserTrainingService } from "./usertraining.service";
import { UserTraining } from "./usertraining.entity";
import { CreateUserTrainingDto, UserTrainingQueryDto } from "./usertraining.dto";
import { type DeepPartial } from "typeorm";
import { IsAdmin, JwtAuthGuard, VerifyUser } from "src/auth/auth.guard";
import { Training } from "src/training/training.entity";


@UseGuards(JwtAuthGuard, VerifyUser, IsAdmin)
@Controller('trainings')
export class UserTrainingController {

    constructor(private readonly userTrainingService: UserTrainingService) { }

    @Get()
    async findAll(@Query() query: UserTrainingQueryDto) {
        return await this.userTrainingService.findAll(query);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<UserTraining> {
        return this.userTrainingService.findOne(+id);
    }

    @Post()
    async create(@Body() createTrainingDto: CreateUserTrainingDto): Promise<Training> {
        return this.userTrainingService.create(createTrainingDto);
    }

    @Put(':id')
    async save(@Param('id') id: number, @Body() training: DeepPartial<UserTraining>) {
        return await this.userTrainingService.save(id, training);
    }

}
