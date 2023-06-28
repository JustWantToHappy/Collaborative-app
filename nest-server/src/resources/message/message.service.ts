import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageType, State } from 'src/common/enum';
import { Message } from '@prisma/client';
import { GroupService } from '../group/group.service';
import { ChatroomService } from '../chatroom/chatroom.service';
@Injectable()
export class MessageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly groupService: GroupService,
    private readonly chatroomService: ChatroomService,
  ) {}
  create(createMessageDto: CreateMessageDto) {
    return this.prisma.message.create({ data: createMessageDto });
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

  find(id: string) {
    return this.prisma.message.findUnique({ where: { id } });
  }

  async update(id: string, userId: string, updateMessageDto: UpdateMessageDto) {
    const message = await this.prisma.message.findUnique({ where: { id } });
    let chatRoom = null;
    if (!message) {
      throw new HttpException(`message${id}不存在`, HttpStatus.NOT_FOUND);
    }
    //如果用户同意
    if (updateMessageDto?.state === State.Agree) {
      if (message.type === MessageType.ApplyGroup) {
        chatRoom = await this.handleApplyGroup(message);
      } else if (message.type === MessageType.ApplyFriend) {
        chatRoom = await this.handleApplyFriend(message);
      }
    }
    await this.prisma.message.update({
      where: { id },
      data: Object.assign(updateMessageDto, { chatRoomId: chatRoom?.id }),
    });
    return this.findAllPending(userId);
  }

  async handleApplyGroup(message: Message) {
    const group = await this.groupService.findOne(message.thirdPartyId);
    const chatroom = await this.prisma.chatRoom.findUnique({
      where: { groupId: group.id },
    });
    await this.chatroomService.updateByGroupId(group.id, {
      userIds: chatroom.userIds + `,${message.senderId}`,
    });
    return chatroom;
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
          friendList:
            senderFriend.friendList === ''
              ? message.receiverId
              : senderFriend.friendList + `,${message.receiverId}`,
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
          friendList:
            senderFriend.friendList === ''
              ? message.senderId
              : receiverFriend.friendList + `,${message.senderId}`,
        },
      });
    }
    //创建私聊聊天室
    return this.chatroomService.create({
      userId: message.senderId,
      userIds: `${message.senderId},${message.receiverId}`,
      type: 'private',
    });
  }

  findChatRoomMessages(chatRoomId: string) {
    return this.prisma.message.findMany({
      where: { chatRoomId, state: State.Agree, type: MessageType.Chat },
    });
  }
}
