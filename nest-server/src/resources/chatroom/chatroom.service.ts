import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageService } from '../message/message.service';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';

@Injectable()
export class ChatroomService {
  constructor(private readonly prisma: PrismaService) {}
  create(createChatroomDto: CreateChatroomDto) {
    return this.prisma.chatRoom.create({ data: createChatroomDto });
  }

  async findAll(id: string) {
    //通过模糊匹配查询出用户所在的所有聊天室
    const result = await this.prisma.chatRoom.findMany({
      where: {
        userIds: {
          contains: id,
        },
        OR: [{ type: 'public' }, { NOT: { userId: id } }],
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
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
    return result;
  }

  findOne(id: string) {
    return this.prisma.chatRoom.findUnique({ where: { id } });
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
