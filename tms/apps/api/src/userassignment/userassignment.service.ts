import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { type DeepPartial, In, Repository } from "typeorm";
import { Assignment, UserAssignment } from "./userassignment.entity";
import { throwSe } from "src/common/exception/exception.util";
import { CreateAssignmentDto, AssignmentQueryDto } from "./userassignment.dto";
import { Messages } from "src/common/constants";
import { promises as fs } from 'fs';
import { User } from "src/user/user.entity";


@Injectable()
export class UserAssignmentService {
    static readonly REVIEWER_ROLE_FILE = "__reviewerRoles.db.txt";

    reviewerRoles: number[] = [];

    constructor(
        @InjectRepository(UserAssignment) private readonly userAssignmentRepository: Repository<UserAssignment>,
        @InjectRepository(Assignment) private readonly assignmentRepository: Repository<Assignment>,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
        fs.readFile(UserAssignmentService.REVIEWER_ROLE_FILE, 'utf8')
            .then(content => this.reviewerRoles = JSON.parse(content))
            .catch(e => console.error(e));
    }

    async findAll(query: AssignmentQueryDto) {
        const queryBuilder = this.assignmentRepository.createQueryBuilder('Test');

        queryBuilder.leftJoinAndSelect("Test.testQuestions", "testQuestions");

        queryBuilder.limit(query.pageSize).offset(query.pageIndex * query.pageSize);

        queryBuilder.where({ status: query.statusFilter });
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

    async findOne(id: number): Promise<Assignment> {
        const test = await this.assignmentRepository.findOne({ where: { assignmentId: id }, relations: { userAssignments: true } });

        if (!test) {
            throw new NotFoundException(Messages.MSG10_EX('Test'));
        }

        return test;
    }

    async create(createUserAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
        return await this.assignmentRepository.save(createUserAssignmentDto);
    }

    async save(id: number, assignment: CreateAssignmentDto): Promise<Assignment> {
        await this.userAssignmentRepository.existsBy({ assignmentId: id }) || throwSe(NotFoundException, "Assignment not found");
        return await this.assignmentRepository.save({ ...assignment, assignmentId: id });
    }

    async setReviewerRoles(reviewerRoles: number[]) {
        await fs.writeFile(UserAssignmentService.REVIEWER_ROLE_FILE, JSON.stringify(reviewerRoles), 'utf8');
        this.reviewerRoles = reviewerRoles;
    }

    async getReviewerRoles() {
        return this.reviewerRoles;
    }

    async getReviewers() {
        return (await this.userRepository.find({ where: { role: { roleId: In(this.reviewerRoles) } }, relations: { role: true } })).map(u => ({
            userId: u.userId, firstName: u.firstName, lastName: u.lastName, roleName: u.role.name
        }));

    }

    // async getUserReviewers(userId: number) {
    //     return (await this.userRepository.findOne({ where: { userId } }))?.reviewers;
    // }

}
