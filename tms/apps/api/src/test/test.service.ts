import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { type DeepPartial, In, IsNull, Not, Repository } from "typeorm";
import { Test, TestQuestion } from "./test.entity";
import { throwSe } from "src/common/exception/exception.util";
import { CreateTestDto, TestQueryDto } from "./test.dto";
import { Messages } from "src/common/constants";


@Injectable()
export class TestService {

    constructor(
        @InjectRepository(Test) private readonly testRepository: Repository<Test>,
        @InjectRepository(TestQuestion) private readonly testQuestionRepository: Repository<TestQuestion>
    ) { }

    async findAll(query: TestQueryDto) {
        const queryBuilder = this.testRepository.createQueryBuilder('Test');

        queryBuilder.leftJoinAndSelect("Test.testQuestions", "testQuestions");

        queryBuilder.limit(query.pageSize).offset(query.pageIndex * query.pageSize);

        queryBuilder.where({ status: query.statusFilter === undefined ? Not(IsNull()) : query.statusFilter });
        if (query.nameFilter) queryBuilder.andWhere("Test.name like :name", { name: `%${query.nameFilter}%` });

        queryBuilder.addOrderBy(`Test.${query.sortBy}`, query.sortDirection);

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

    async findOne(id: number): Promise<Test> {
        const test = await this.testRepository.findOne({ where: { testId: id }, relations: { testQuestions: true } });

        if (!test) {
            throw new NotFoundException(Messages.MSG10_EX('Test'));
        }

        return test;
    }

    async create(createTestDto: CreateTestDto): Promise<Test> {
        const existingTest = await this.testRepository.findOne({
            where: { name: createTestDto.name },
        });

        if (existingTest) {
            throw new ConflictException(Messages.DUPLICAT_ENTRY("Test"));
        }

        const test = this.testRepository.create({
            ...createTestDto,
        });

        return this.testRepository.save(test);
    }

    async save(id: number, test: DeepPartial<Test>) {
        await this.testRepository.existsBy({ testId: id }) || throwSe(NotFoundException, "Test not found");
        test.testQuestions?.forEach(tq => tq.testId = id);
        await this.testQuestionRepository.delete({ testId: id });
        return await this.testRepository.save({ ...test, testId: id });
    }

}
