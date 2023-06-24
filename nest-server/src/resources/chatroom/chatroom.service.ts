import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new HttpException(`用户${id}不存在`, HttpStatus.NOT_FOUND);
    }
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
            id: true,
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
          skip: 1,
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
    result = result.map((value) => {
      if (value.User && value.User.id !== id) {
        value.User = {
          id,
          avatar: user.avatar,
          name: user.name,
        };
      }
      return value;
    });
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

  async findChatRecordsByChatRoomId(id: string) {
    const result = await this.prisma.$queryRaw`
      select user.name,user.avatar,message.id,senderId,receiverId,chatRoomId,text,fileType
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
