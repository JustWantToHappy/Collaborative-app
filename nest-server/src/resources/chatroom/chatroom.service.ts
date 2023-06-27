import { Injectable } from '@nestjs/common';
import { MessageType } from 'src/common/enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';

@Injectable()
export class ChatroomService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}
  create(createChatroomDto: CreateChatroomDto) {
    return this.prisma.chatRoom.create({ data: createChatroomDto });
  }

  findOne(id: string) {
    return this.prisma.chatRoom.findUnique({ where: { id } });
  }

  async findAll(id: string) {
    //通过模糊匹配查询出用户所在的所有聊天室
    let result = await this.prisma.chatRoom.findMany({
      where: {
        userIds: {
          contains: id,
        },
      },
      select: {
        id: true,
        userIds: true,
        type: true,
        Group: true,
        User: {
          select: {
            name: true,
            avatar: true,
          },
        },
        Messages: {
          select: {
            text: true,
            fileType: true,
            createdAt: true,
          },
          take: 1,
          skip: 0,
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
    result = await Promise.all(
      result.map(async (value) => {
        if (value.User) {
          const userIds = value.userIds.split(',');
          const receiverId = userIds[0] === id ? userIds[1] : userIds[0];
          const receiver = await this.userService.findOne(receiverId);
          value.User = {
            name: receiver.name,
            avatar: receiver.avatar,
          };
        }
        return value;
      }),
    );
    //按照时间顺序对聊天列表进行排序
    result.sort((a: any, b: any) => {
      return b.Messages[0]?.createdAt - a.Messages[0]?.createdAt;
    });
    return result;
  }

  findAllChatRoomId(userId: string) {
    return this.prisma.chatRoom.findMany({
      select: { id: true },
      where: { userIds: { contains: userId } },
    });
  }

  async findChatRoomByGroupName(name: string) {
    const group = await this.prisma.group.findUnique({
      where: { name },
      include: { ChatRoom: true },
    });
    return group.ChatRoom.id;
  }

  async findChatRecordsByChatRoomId(id: string) {
    const result = await this.prisma.$queryRaw`
      select user.name,user.avatar,message.id,senderId,receiverId,chatRoomId,text,fileType,message.createdAt
      from message inner join user on message.senderId=user.id
      where type=${MessageType.Chat} and chatRoomId=${id}
      order by message.createdAt asc 
    `;
    return result;
  }

  async updateByGroupId(id: string, updateChatroomDto: UpdateChatroomDto) {
    await this.prisma.chatRoom.update({
      where: { groupId: id },
      data: updateChatroomDto,
    });
  }

  remove(id: string) {
    return this.prisma.chatRoom.delete({ where: { id } });
  }
}
