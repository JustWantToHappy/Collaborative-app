import { Injectable } from '@nestjs/common';
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
    const message1 = await this.messageService.findOne(
      id,
      user.id,
      MessageType.ApplyFriend,
      State.Pending,
    );
    if (message1) {
      return '你已邀请此用户';
    }
    const message2 = await this.messageService.findOne(
      user.id,
      id,
      MessageType.ApplyFriend,
      State.Pending,
    );
    if (message2) {
      return '对方已对你发出好友申请';
    }
    const isFriend = await this.isFriend(id, user.id);
    if (isFriend) {
      return '好友关系已存在';
    }
    await this.messageService.create({
      senderId: id,
      receiverId: user.id,
      type: MessageType.ApplyFriend,
    });
    return '邀请成功！';
  }

  findOne(userId: string) {
    return this.prisma.friend.findUnique({ where: { userId } });
  }

  isFriend(userId: string, friendId: string) {
    return this.prisma.friend.findFirst({
      where: {
        userId,
        friendList: {
          contains: friendId,
        },
      },
    });
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
