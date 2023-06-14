import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.findOnyByEmail(createUserDto.email);
    if (user) {
      throw new ConflictException(`$邮箱{user.email}已经注册`);
    }
    await this.prisma.user.create({ data: createUserDto });
    return 'create success';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  findOnyByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
