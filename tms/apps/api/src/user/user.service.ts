import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeepPartial, Repository } from 'typeorm';
import { User } from '../common/entities/user.entity';
import { Messages } from '../common/constants/messages';
import { CreateUserDto, UserQueryDto } from './user.dto';
import { AuthService } from 'src/auth/auth.service';
import { throwSe } from 'src/common/exception/exception.util';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly authService: AuthService
  ) {}

  async findAll(query: UserQueryDto) {
    const queryBuilder = this.userRepository.createQueryBuilder();

    queryBuilder.limit(query.pageSize).offset(query.pageIndex * query.pageSize);

    queryBuilder.where({ status: query.statusFilter ? 'enabled' : 'disabled' });
    if (query.simplenameFilter) {
      queryBuilder.andWhere(new Brackets(qb => {
        qb.where("User.username like :username", { username: `%${query.simplenameFilter}%` })
          .orWhere("User.email like :email", { email: `%${query.simplenameFilter}`});
      }));
    }

    queryBuilder.addOrderBy(`User.${query.sortBy}`, query.sortDirection);

    const [result, resultCount] = await queryBuilder.getManyAndCount();

    return {
      data: result,
      pageIndex: query.pageIndex,
      pageSize: query.pageSize,
      pageCount: Math.ceil(resultCount / query.pageSize),
      resultCount,
      sortBy: query.sortBy,
      sortDirection: query.sortDirection,
      simplenameFilter: query.simplenameFilter,
      statusFilter: query.statusFilter
    };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userId: id } });

    if (!user) {
      throw new NotFoundException(Messages.MSG10_EX('User'));
    }

    return user;
  }

  async create<T extends CreateUserDto>(createUserDto: T): Promise<User> {
    if (await this.userRepository.existsBy({ username: createUserDto.username })) {
      throw new ConflictException(Messages.DUPLICAT_ENTRY('User'));
    }

    const user = await this.authService.createAuthUser(createUserDto, false, true);;
    return await this.userRepository.save(user);
  }

  async save(id: number, user: DeepPartial<User>) {
    await this.userRepository.existsBy({ userId: id }) || throwSe(NotFoundException);
    return await this.userRepository.save({ ...user, userId: id });
  }

}
