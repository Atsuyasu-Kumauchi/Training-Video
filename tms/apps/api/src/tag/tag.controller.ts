import { Body, Controller, Get, HttpCode, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { TagService } from "./tag.service";
import { Tag } from "./tag.entity";
import { CreateTagDto, TagQueryDto } from "./tag.dto";
import { type DeepPartial } from "typeorm";
import { IsAdmin, JwtAuthGuard, VerifyUser } from "src/auth/auth.guard";


@UseGuards(JwtAuthGuard, VerifyUser, IsAdmin)
@Controller('tags')
export class TagController {

    constructor(private readonly tagService: TagService) { }

    @Get()
    async findAll(@Query() query: TagQueryDto) {
        return await this.tagService.findAll(query);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Tag> {
        return await this.tagService.findOne(+id);
    }

    @Post()
    async create(@Body() createTagtDto: CreateTagDto): Promise<Tag> {
        return await this.tagService.create(createTagtDto);
    }

    @Put(':id')
    async save(@Param('id') id: number, @Body() tag: DeepPartial<Tag>) {
        return await this.tagService.save(id, tag);
    }

}
