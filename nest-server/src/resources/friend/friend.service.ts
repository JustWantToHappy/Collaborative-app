import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MessageType, State } from 'src/common/enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageService } from '../message/message.service';
import { UpdateFriendDto } from './dto/update-friend.dto';

@Injectable()
export class FriendService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly messageService: MessageService,
  ) {}
  async create(id: string, email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      return `${email}不存在`;
    }
    const message = await this.messageService.findOne(
      id,
      user.id,
      MessageType.ApplyFriend,
    );
    if (message) {
      return '你已邀请此用户';
    }
    this.messageService.create({
      senderId: id,
      receiverId: user.id,
      type: MessageType.ApplyFriend,
    });
    return '邀请成功！';
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
