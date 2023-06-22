import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageType, State } from 'src/common/enum';
import { Message } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMessageDto: CreateMessageDto) {
    await this.prisma.message.create({ data: createMessageDto });
  }

  findAllPending(id: string) {
    const query = this.prisma.$queryRaw`
      select message.id,user.name,user.avatar,message.createdAt,thirdPartyId,groupName,groupAvatar,type 
      from user
      inner join message on message.senderId=user.id and receiverId=${id}
      where state=${State.Pending}
    `;
    return query;
  }

  findOne(
    senderId: string,
    receiverId: string,
    type: MessageType,
    state?: State,
  ) {
    return this.prisma.message.findFirst({
      where: { senderId, receiverId, type, state },
    });
  }

  async update(id: string, userId: string, updateMessageDto: UpdateMessageDto) {
    const message = await this.prisma.message.findUnique({ where: { id } });
    if (!message) {
      throw new HttpException(`message${id}不存在`, HttpStatus.NOT_FOUND);
    }
    //如果用户同意
    if (updateMessageDto?.state === State.Agree) {
      if (message.type === MessageType.ApplyGroup) {
        this.handleApplyGroup(message);
      } else if (message.type === MessageType.ApplyFriend) {
        this.handleApplyFriend(message);
      }
    }
    await this.prisma.message.update({
      where: { id },
      data: updateMessageDto,
    });
    return this.findAllPending(userId);
  }

  async handleApplyGroup(message: Message) {
    const group = await this.prisma.group.findUnique({
      where: { id: message.thirdPartyId },
    });
    const chatroom = await this.prisma.chatRoom.findUnique({
      where: { groupId: group.id },
    });
    await this.prisma.chatRoom.update({
      where: { groupId: group.id },
      data: { userIds: chatroom.userIds + `,${message.senderId}` },
    });
  }

  async handleApplyFriend(message: Message) {
    const senderFriend = await this.prisma.friend.findUnique({
      where: { userId: message.senderId },
    });
    const receiverFriend = await this.prisma.friend.findUnique({
      where: { userId: message.receiverId },
    });
    if (!senderFriend) {
      await this.prisma.friend.create({
        data: { userId: message.senderId, friendList: message.receiverId },
      });
    } else {
      await this.prisma.friend.update({
        where: { userId: message.senderId },
        data: {
          friendList: senderFriend.friendList + `,${message.receiverId}`,
        },
      });
    }
    if (!receiverFriend) {
      await this.prisma.friend.create({
        data: { userId: message.receiverId, friendList: message.senderId },
      });
    } else {
      await this.prisma.friend.update({
        where: { userId: message.receiverId },
        data: {
          friendList: receiverFriend.friendList + `,${message.senderId}`,
        },
      });
    }
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
