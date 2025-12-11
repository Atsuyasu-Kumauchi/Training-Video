import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../common/entities/user.entity';
import { Messages } from '../common/constants/messages';
import { CreateUserDto } from './user.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create<T extends CreateUserDto>(createUserDto: T): Promise<User> {
    if (await this.userRepository.existsBy({ username: createUserDto.username })) {
      throw new ConflictException(Messages.DUPLICAT_ENTRY('User'));
    }

    const user = this.userRepository.create({ ...createUserDto });
    return await this.userRepository.save(user);
  }

  async saveUser(user: User) {
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      where: { status: 'enabled' },
      order: { username: 'ASC' },
    });
  }

  async findOneByField(field: string, value: any) {
    return await this.userRepository.findOne({
      where: { [field]: value },
    });
  }

  async findById(id: number): Promise<User|null> {
    return await this.findOneByField("userId", id);
  }

  async findByUsername(username: string): Promise<User|null> {
    return await this.findOneByField("username", username);
  }

  async findByEmail(email: string): Promise<User|null> {
    return await this.findOneByField("email", email);
  }

}
