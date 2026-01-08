import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { type DeepPartial, Repository } from "typeorm";
import { Tag } from "./tag.entity";
import { throwSe } from "src/common/exception/exception.util";
import { CreateTagDto, TagQueryDto } from "./tag.dto";
import { Messages } from "src/common/constants";


@Injectable()
export class TagService {

    constructor(
        @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>
    ) { }

    async findAll(query: TagQueryDto) {
        const queryBuilder = this.tagRepository.createQueryBuilder('Tag');

        queryBuilder.limit(query.pageSize).offset(query.pageIndex * query.pageSize);

        queryBuilder.where({ status: query.statusFilter });
        if (query.nameFilter) queryBuilder.andWhere("Tag.name like :name", { name: `%${query.nameFilter}%` });

        queryBuilder.addOrderBy(`Tag.${query.sortBy}`, query.sortDirection);

        const [result, resultCount] = await queryBuilder.getManyAndCount();

        return {
            data: result,
            pageIndex: query.pageIndex,
            pageSize: query.pageSize,
            pageCount: Math.ceil(resultCount / query.pageSize),
            resultCount,
            sortBy: query.sortBy,
            sortDirection: query.sortDirection,
            nameFilter: query.nameFilter || null,
            statusFilter: query.statusFilter
        };
    }

    async findOne(id: number): Promise<Tag> {
        const tag = await this.tagRepository.findOne({ where: { tagId: id } });

        if (!tag) {
            throw new NotFoundException(Messages.MSG10_EX('Tag'));
        }

        return tag;
    }

    async create(createTagDto: CreateTagDto): Promise<Tag> {
        const existingTag = await this.tagRepository.findOne({
            where: { name: createTagDto.name },
        });

        if (existingTag) {
            throw new ConflictException(Messages.DUPLICAT_ENTRY("Tag"));
        }

        const tag = this.tagRepository.create({
            ...createTagDto,
        });

        return this.tagRepository.save(tag);
    }

    async save(id: number, tag: DeepPartial<Tag>) {
        await this.tagRepository.existsBy({ tagId: id }) || throwSe(NotFoundException);
        return await this.tagRepository.save({ ...tag, tagId: id });
    }

}
