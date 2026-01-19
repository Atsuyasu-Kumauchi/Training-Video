import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { UserAssignmentService } from "./userassignment.service";
import { CreateAssignmentDto, AssignmentQueryDto } from "./userassignment.dto";
import { type DeepPartial } from "typeorm";
import { IsAdmin, JwtAuthGuard, VerifyUser } from "src/auth/auth.guard";
import { Assignment } from "./userassignment.entity";


@UseGuards(JwtAuthGuard, VerifyUser, IsAdmin)
@Controller('assignments')
export class UserAssignmentController {

    constructor(private readonly userAssignmentService: UserAssignmentService) { }

    @Post("setReviewerRoles")
    async setReviewerRoles(@Body() reviewerRoles: number[]) {
        await this.userAssignmentService.setReviewerRoles(reviewerRoles);
    }

    @Get("getReviewerRoles")
    async getReviewerRoles() {
        return await this.userAssignmentService.getReviewerRoles();
    }

    @Get('reviewers')
    async getReviewers() {
        return await this.userAssignmentService.getReviewers();
    }

    @Get()
    async findAll(@Query() query: AssignmentQueryDto) {
        return await this.userAssignmentService.findAll(query);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.userAssignmentService.findOne(+id);
    }

    @Post()
    async create(@Body() createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
        return await this.userAssignmentService.create(createAssignmentDto);
    }

    @Put(':id')
    async save(@Param('id') id: number, @Body() createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
        return await this.userAssignmentService.save(id, createAssignmentDto);
    }

}
