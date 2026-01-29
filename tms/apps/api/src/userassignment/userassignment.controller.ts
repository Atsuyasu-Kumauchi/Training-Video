import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { UserAssignmentService } from "./userassignment.service";
import { AssignmentQueryDto, CreateAssignmentDto, UserAssignmentQueryDto } from "./userassignment.dto";
import { type DeepPartial } from "typeorm";
import { IsAdmin, JwtAuthGuard, VerifyUser } from "src/auth/auth.guard";
import { Assignment, UserAssignment } from "./userassignment.entity";


@UseGuards(JwtAuthGuard, VerifyUser)
@Controller('assignments')
export class UserAssignmentController {

    constructor(private readonly userAssignmentService: UserAssignmentService) { }

    @Post("setReviewerRoles")
    @UseGuards(IsAdmin)
    async setReviewerRoles(@Body() reviewerRoles: number[]) {
        return await this.userAssignmentService.setReviewerRoles(reviewerRoles);
    }

    @Get("getReviewerRoles")
    @UseGuards(IsAdmin)
    async getReviewerRoles() {
        return await this.userAssignmentService.getReviewerRoles();
    }

    @Get('getReviewers')
    @UseGuards(IsAdmin)
    async getReviewers() {
        return await this.userAssignmentService.getReviewers();
    }

    @Post('saveUserAssignment/:id')
    async saveUserAssignment(@Req() req, @Query('id') assignmentId: number, @Body() userAssigment: DeepPartial<UserAssignment>) {
        if (!req.user.isAdmin) {
            delete userAssigment.reviews;
            delete userAssigment.assignment;
        }
        return await this.userAssignmentService.saveUserAssignment(req.user.userId, assignmentId, userAssigment);
    }

    @Get('getUserAssignments')
    async getUserAssignments(@Req() req, @Query('assignmentIds') assignmentIds: string) {
        return await this.userAssignmentService.getUserAssignments(req.user.userId, assignmentIds.split(",").map(v => +v));
    }

    @Get('findUserAssignments')
    @UseGuards(IsAdmin)
    async findAllUserAssignments(@Req() req, @Query() query: UserAssignmentQueryDto) {
        const reviewer = (await this.userAssignmentService.getReviewers()).find(r => r.userId === req.user.userId);
        return await this.userAssignmentService.findAllUserAssignments(query, reviewer?.userId);
    }

    @Get('findUserAssignment')
    @UseGuards(IsAdmin)
    async findOneUserAssignments(@Req() req, @Param('id') assignmentId: number) {
        const reviewer = (await this.userAssignmentService.getReviewers()).find(r => r.userId === req.user.userId);
        return await this.userAssignmentService.findOneUserAssignment(assignmentId, reviewer?.userId);
    }

    @Get()
    async findAll(@Req() req, @Query() query: AssignmentQueryDto) {
        return await this.userAssignmentService.findAll(query);
    }

    @Get(':id')
    async findOne(@Req() req, @Param('id') assignmentId: number) {
        return await this.userAssignmentService.findOne(assignmentId);
    }

    @Post()
    @UseGuards(IsAdmin)
    async create(@Body() assignment: CreateAssignmentDto): Promise<Assignment> {
        return await this.userAssignmentService.create(assignment);
    }

    @Put(':id')
    @UseGuards(IsAdmin)
    async save(@Param('id') id: number, @Body() createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
        return await this.userAssignmentService.save(id, createAssignmentDto);
    }

}
