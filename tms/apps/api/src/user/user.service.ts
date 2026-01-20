import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeepPartial, IsNull, Not, Repository } from 'typeorm';
import { User } from './user.entity';
import { Messages } from '../common/constants/messages';
import { CreateUserDto, UserQueryDto } from './user.dto';
import { AuthService } from 'src/auth/auth.service';
import { throwSe } from 'src/common/exception/exception.util';
import { Tag } from 'src/tag/tag.entity';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly authService: AuthService
  ) {}

  async findAll(query: UserQueryDto) {
    const queryBuilder = this.userRepository.createQueryBuilder('User');

    queryBuilder.leftJoin('User.role', 'Role').addSelect(['Role.roleId', 'Role.name']);
    queryBuilder.leftJoin('User.department', 'Department').addSelect(['Department.departmentId', 'Department.name']);
    queryBuilder.leftJoin('User.tags', 'Tag').addSelect(['Tag.tagId', 'Tag.name']);

    queryBuilder.limit(query.pageSize).offset(query.pageIndex * query.pageSize);

    queryBuilder.where({ status: query.statusFilter === null ? Not(IsNull()) : query.statusFilter });
    if (query.simplenameFilter) {
      queryBuilder.andWhere(new Brackets(qb => {
        qb.where("User.username like :username", { username: `%${query.simplenameFilter}%` })
          .orWhere("User.email like :email", { email: `%${query.simplenameFilter}`});
      }));
    }
    if (query.departmentIdFilter) queryBuilder.where("User.departmentId = :departmentId", { departmentId: query.departmentIdFilter });

    queryBuilder.addOrderBy(`User.${query.sortBy}`, query.sortDirection);

    const [result, resultCount] = await queryBuilder.getManyAndCount();

    return {
      data: result.map(u => {
        const user = u as any;
        user.userTagIds = user.tags.map((t: Tag) => t.tagId);
        return user;
      }),
      pageIndex: query.pageIndex,
      pageSize: query.pageSize,
      pageCount: Math.ceil(resultCount / query.pageSize),
      resultCount,
      sortBy: query.sortBy,
      sortDirection: query.sortDirection,
      departmentIdFilter: query.departmentIdFilter || null,
      simplenameFilter: query.simplenameFilter || null,
      statusFilter: query.statusFilter
    };
  }

  async findOne(id: number): Promise<User & { userTagIds: number[] }> {
    const user = await this.userRepository.findOne({ where: { userId: id }, relations: { tags: true } }) as any;
    user.userTagIds = user.tags.map((t: Tag) => t.tagId);

    if (!user) {
      throw new NotFoundException(Messages.MSG10_EX('User'));
    }

    return user;
  }

  async create<T extends CreateUserDto>(createUserDto: T): Promise<User & { userTags: number[] }> {
    if (await this.userRepository.existsBy({ username: createUserDto.username })) {
      throw new ConflictException(Messages.DUPLICAT_ENTRY('User'));
    }

    const user = await this.authService.createAuthUser(createUserDto, false, true);
    user.tags = createUserDto.userTagIds.map(t => ({ tagId: t } as Tag));
    return { ...(await this.userRepository.save(user) as any), tags: undefined, userTags: createUserDto.userTagIds } ;
  }

  async save(id: number, user: DeepPartial<User>, userTags: number[]) {
    await this.userRepository.existsBy({ userId: id }) || throwSe(NotFoundException);
    await this.authService.updateAuthUser(user);
    user.tags = userTags.map(t => ({ tagId: t } as Tag));
    return await this.userRepository.save({ ...user, userId: id });
  }

}
