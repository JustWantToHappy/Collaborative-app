import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';

@Injectable()
export class ChatroomService {
  constructor(private readonly prisma: PrismaService) {}
  create(createChatroomDto: CreateChatroomDto) {
    return 'This action adds a new chatroom';
  }

  async findAll(id: string) {
    //通过模糊匹配查询出用户所在的所有聊天室
    const result = await this.prisma.chatRoom.findMany({
      where: {
        userIds: {
          contains: id,
        },
      },
      include: {
        Group: true,
        ChatRecords: {
          include: {
            Messages: {
              select: {
                createdAt: true,
              },
              orderBy: { createdAt: 'desc' },
              take: 1,
            },
          },
        },
      },
    });
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatroom`;
  }

  update(id: number, updateChatroomDto: UpdateChatroomDto) {
    return `This action updates a #${id} chatroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatroom`;
  }
}
