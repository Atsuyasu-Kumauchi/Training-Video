import { Body, Controller, Get, Param, Post, Put, Query, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { UserTrainingService } from "./usertraining.service";
import { UserTraining } from "./usertraining.entity";
import { CreateUserTrainingDto, UserTrainingQueryDto } from "./usertraining.dto";
import { type DeepPartial } from "typeorm";
import { IsAdmin, JwtAuthGuard, VerifyUser } from "src/auth/auth.guard";
import { Training } from "src/training/training.entity";


@UseGuards(JwtAuthGuard, VerifyUser)
@Controller('trainings')
export class UserTrainingController {

    constructor(private readonly userTrainingService: UserTrainingService) { }

    @Get()
    async findAll(@Req() req, @Query() query: UserTrainingQueryDto) {
        if (!req.user.isAdmin) query.userIdFilter = req.user.userId;
        return await this.userTrainingService.findAll(query);
    }

    @Get(':id')
    async findOne(@Req() req, @Param('id') id: string) {
        return this.userTrainingService.findOne(+id, req.user.isAdmin ? undefined : req.user.userId);
    }

    @Post()
    @UseGuards(IsAdmin)
    async create(@Body() createTrainingDto: CreateUserTrainingDto): Promise<Training> {
        return this.userTrainingService.create(createTrainingDto);
    }

    @Put(':id')
    @UseGuards(IsAdmin)
    async save(@Param('id') id: number, @Body() training: DeepPartial<UserTraining>) {
        return await this.userTrainingService.save(id, training);
    }

}
