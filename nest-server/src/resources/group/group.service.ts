import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MessageType, State } from 'src/common/enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatroomService } from '../chatroom/chatroom.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly chatRoomService: ChatroomService,
  ) {}
  async create(createGroupDto: CreateGroupDto) {
    const group = await this.prisma.group.findUnique({
      where: { name: createGroupDto.name },
    });
    if (group) {
      throw new HttpException(
        `${createGroupDto.name} 已被注册！`,
        HttpStatus.CONFLICT,
      );
    }
    //创建群组的同时创建一个房间，事务操作
    await this.prisma.group.create({
      data: {
        ...createGroupDto,
        ChatRoom: {
          create: {
            userIds: createGroupDto.leaderId + '',
            type: 'public',
          },
        },
      },
    });
    const chatRoomId = await this.chatRoomService.findChatRoomByGroupName(
      createGroupDto.name,
    );
    return chatRoomId;
  }

  findAll() {
    return `This action returns all group`;
  }

  async findUserGroups(id: string) {
    return [];
  }

  findOne(id: string) {
    return this.prisma.group.findUnique({ where: { id } });
  }
  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }

  async applyJoin(id: string, name: string) {
    const group = await this.prisma.group.findUnique({ where: { name } });
    if (!group) {
      throw new HttpException('此群不存在', HttpStatus.NOT_FOUND);
    }
    if (group.leaderId === id) {
      throw new HttpException('你已加入此群', HttpStatus.CONFLICT);
    }
    const isApply = await this.prisma.message.findFirst({
      where: {
        senderId: id,
        receiverId: group.leaderId,
        type: MessageType.ApplyGroup,
      },
    });
    if (isApply) {
      const str =
        isApply.state === State.Pending
          ? '你已发送过申请，不可以重复发送'
          : '你已加入此群';
      throw new HttpException(str, HttpStatus.CONFLICT);
    }
    await this.prisma.message.create({
      data: {
        senderId: id,
        receiverId: group.leaderId,
        thirdPartyId: group.id,
        groupName: group.name,
        groupAvatar: group.avatar,
        type: MessageType.ApplyGroup,
      },
    });
    return group.leaderId;
  }
}
