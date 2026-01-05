import { Body, Controller, Get, HttpCode, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { TrainingService } from "./training.service";
import { Training } from "./training.entity";
import { CreateTrainingDto, TrainingQueryDto } from "./training.dto";
import { type DeepPartial } from "typeorm";
import { IsAdmin, JwtAuthGuard, VerifyUser } from "src/auth/auth.guard";


@UseGuards(JwtAuthGuard, VerifyUser, IsAdmin)
@Controller('trainings')
export class TrainingController {

    constructor(private readonly trainingService: TrainingService) { }

    @Get()
    async findAll(@Query() query: TrainingQueryDto) {
        return await this.trainingService.findAll(query);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Training> {
        return this.trainingService.findOne(+id);
    }

    @Post()
    async create(@Body() createTrainingDto: CreateTrainingDto): Promise<Training> {
        return this.trainingService.create(createTrainingDto);
    }

    @Put(':id')
    async save(@Param('id') id: number, @Body() training: DeepPartial<Training>) {
        return await this.trainingService.save(id, training);
    }

}
