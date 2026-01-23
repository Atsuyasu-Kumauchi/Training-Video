import { Body, Controller, Get, Param, Patch, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { IsAdmin, JwtAuthGuard, VerifyUser } from "src/auth/auth.guard";
import { Training } from "src/training/training.entity";
import { CreateUserTrainingDto, UserTrainingQueryDto } from "./usertraining.dto";
import { UserTrainingService } from "./usertraining.service";


@UseGuards(JwtAuthGuard, VerifyUser)
@Controller('trainings')
export class UserTrainingController {

    constructor(private readonly userTrainingService: UserTrainingService) { }

    @Patch(':id/saveProgress')
    async savePartial(@Req() req, @Param('id') trainingId: number, @Body() trainingProgress: { videoId: number, progress: any }) {
        return await this.userTrainingService.saveUserTrainigProgress(req.user.userId, trainingId, trainingProgress);
    }

    @Get()
    async findAll(@Req() req, @Query() query: UserTrainingQueryDto) {
        if (!req.user.isAdmin) query.userIdFilter = req.user.userId;
        return await this.userTrainingService.findAllTrainigs(query);
    }

    @Get(':id')
    async findOne(@Req() req, @Param('id') trainingId: number) {
        return await this.userTrainingService.findOneTraining(trainingId, req.user.isAdmin ? undefined : req.user.userId);
    }

    @Post()
    @UseGuards(IsAdmin)
    async create(@Body() userTraining: CreateUserTrainingDto): Promise<Training> {
        return await this.userTrainingService.createUserTraining(userTraining);
    }

    @Put(':id')
    @UseGuards(IsAdmin)
    async save(@Param('id') trainingId: number, @Body() userTraining: CreateUserTrainingDto & { progress?: any[] }): Promise<Training> {
        return await this.userTrainingService.saveUserTraining(trainingId, { ...userTraining, progress: userTraining.progress || [] });
    }

}
