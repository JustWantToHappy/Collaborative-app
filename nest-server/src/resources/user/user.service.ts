import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { ContactService } from '../contact/contact.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    //private readonly contactService: ContactService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: createUserDto?.email },
    });
    if (user) {
      throw new ConflictException(`${createUserDto.email} has registered`);
    } else {
      const user = await this.userRepository.create(createUserDto);
      return this.userRepository.save(user);
    }
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { current, pagesize } = paginationQuery;
    if (!current || !pagesize) {
      return this.userRepository.find();
    }
    return this.userRepository.find({
      skip: (current - 1) * pagesize,
      take: pagesize,
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`user ${id} is not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }

  async findOnyByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`user ${email} is not found.`);
    }
    return user;
  }

  async invite(email: string, id: number) {
    const user = await this.findOnyByEmail(email);
  }
}
