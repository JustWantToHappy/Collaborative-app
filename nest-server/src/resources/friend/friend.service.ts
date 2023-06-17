import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ChatRoom, State } from 'src/common/enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { UpdateFriendDto } from './dto/update-friend.dto';

@Injectable()
export class FriendService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}
  async create(email: string) {
    const user = await this.userService.findOnyByEmail(email);

    return user;
  }

  async findAll(id: string) {}

  async invitedInfo(id: string) {
    return [];
  }

  async update(id: string, updateFriendDto: UpdateFriendDto) {
    return 'update success';
  }

  async remove(id: string) {}
}
