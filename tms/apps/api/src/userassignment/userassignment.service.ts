import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { type DeepPartial, In, IsNull, Not, Raw, Repository } from "typeorm";
import { Assignment, UserAssignment } from "./userassignment.entity";
import { TvmsConfig } from '../common/entities';
import { throwSe } from "src/common/exception/exception.util";
import { AssignmentQueryDto, CreateAssignmentDto, UserAssignmentQueryDto } from "./userassignment.dto";
import { User } from "src/user/user.entity";


@Injectable()
export class UserAssignmentService {
    static readonly REVIEWER_ROLE_KEY = "reviewer_role";

    // reviewerRoles: number[] = [];

    constructor(
        @InjectRepository(UserAssignment) private readonly userAssignmentRepository: Repository<UserAssignment>,
        @InjectRepository(Assignment) private readonly assignmentRepository: Repository<Assignment>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(TvmsConfig) private readonly tvmsConfigRepository: Repository<TvmsConfig>
    ) { }

    async getUserAssignments(userId: number, assignmentIds: number[]) {
        return await this.userAssignmentRepository.find({ where: { userId, assignmentId: In(assignmentIds) }, relations: { assignment: true } });
    }

    async findAllUserAssignments(query: UserAssignmentQueryDto, reviewerId?: number) {
        const reviewerUsers = reviewerId ? (await this.userRepository.findBy({
            reviewers: Raw((alias) => `${alias} ? :reviewerId`, { reviewerId })
        })).map(u => u.userId) : [];

        const queryBuilder = this.userAssignmentRepository.createQueryBuilder('UserAssignment');

        queryBuilder.leftJoinAndSelect("UserAssignment.assignment", "Assignment");

        queryBuilder.take(query.pageSize).skip(query.pageIndex * query.pageSize);

        queryBuilder.addOrderBy(`UserAssignment.${query.sortBy}`, query.sortDirection);

        let [result, resultCount] = await queryBuilder.getManyAndCount();

        // queryBuilder.andWhere("UserAssignment.userId IN (:...userIds)", { userIds: reviewerUsersFilter.map(v => v.userId) });
        result = result.filter(ua => reviewerUsers.includes(ua.userId))

        return {
            data: result,
            pageIndex: query.pageIndex,
            pageSize: query.pageSize,
            pageCount: Math.ceil(resultCount / query.pageSize),
            resultCount,
            sortBy: query.sortBy,
            sortDirection: query.sortDirection,
            nameFilter: query.nameFilter || null,
        };
    }

    async findOneUserAssignment(id: number, reviewerId?: number) {
        const reviewerUsers = reviewerId ? (await this.userRepository.findBy({
            reviewers: Raw((alias) => `${alias} ? :reviewerId`, { reviewerId })
        })).map(u => u.userId) : [];

        const userAssignment = await this.userAssignmentRepository
            .findOne({ where: { assignmentId: id }, relations: { assignment: true } }) || throwSe(NotFoundException);

        if (reviewerUsers.includes(userAssignment.userId)) return userAssignment;

        throwSe(NotFoundException);
    }

    async findAll(query: AssignmentQueryDto) {
        const queryBuilder = this.assignmentRepository.createQueryBuilder('Assignment');

        queryBuilder.limit(query.pageSize).offset(query.pageIndex * query.pageSize);

        queryBuilder.where({ assignmentId: Not(IsNull()) });
        if (query.nameFilter) queryBuilder.andWhere("Assignment.name like :name", { name: `%${query.nameFilter}%` });

        queryBuilder.addOrderBy(`Assignment.${query.sortBy}`, query.sortDirection);

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
        };
    }

    async findOne(assignmentId: number) {
        return await this.assignmentRepository.findOneBy({ assignmentId }) || throwSe(NotFoundException);
    }

    async create(createUserAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
        return await this.assignmentRepository.save(createUserAssignmentDto);
    }

    async save(id: number, assignment: CreateAssignmentDto): Promise<Assignment> {
        await this.assignmentRepository.existsBy({ assignmentId: id }) || throwSe(NotFoundException);
        return await this.assignmentRepository.save({ ...assignment, assignmentId: id });
    }

    async setReviewerRoles(reviewerRoles: number[]) {
        return await this.tvmsConfigRepository.upsert({ configKey: UserAssignmentService.REVIEWER_ROLE_KEY, configValue: reviewerRoles },
            [UserAssignmentService.REVIEWER_ROLE_KEY]);
    }

    async getReviewerRoles() {
        return (await this.tvmsConfigRepository.findOneBy({ configKey: UserAssignmentService.REVIEWER_ROLE_KEY }))?.configValue;
    }

    async getReviewers() {
        const reviewerRoles = await this.getReviewerRoles() || [];
        return (await this.userRepository.find({ where: { role: { roleId: In(reviewerRoles) } }, relations: { role: true } })).map(u => ({
            userId: u.userId, firstName: u.firstName, lastName: u.lastName, roleName: u.role.name, roleId: u.role.roleId
        }));
    }

    async saveUserAssignment(userId: any, userAssigment: DeepPartial<UserAssignment>) {
        return await this.userAssignmentRepository.save({ ...userAssigment, userId });
    }

    // async getUserReviewers(userId: number) {
    //     return (await this.userRepository.findOne({ where: { userId } }))?.reviewers;
    // }

}
