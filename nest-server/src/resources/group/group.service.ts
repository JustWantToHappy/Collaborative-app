import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MessageType } from 'src/common/enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createGroupDto: CreateGroupDto) {
    const team = await this.prisma.group.findUnique({
      where: { name: createGroupDto.name },
    });
    if (team) {
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
          },
        },
      },
    });
    return 'create success';
  }

  findAll() {
    return `This action returns all group`;
  }

  async findUserGroups(id: string) {
    return [];
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
    const isJoin = await this.prisma.message.findFirst({
      where: { senderId: id, receiverId: group.id },
    });
    if (isJoin) {
      throw new HttpException('你已加入该团队', HttpStatus.CONFLICT);
    }
    const joinGroup = this.prisma.message.create({
      data: {
        senderId: id,
        receiverId: group.id,
        type: MessageType.ApplyGroup,
      },
    });
    const addChatRoom = this.prisma.chatRoom.findUnique({
      where: { groupId: group.id },
    });
    const chatRoomAddUser = this.prisma.chatRoom.update({
      where: { groupId: group.id },
      data: {
        userIds: (await addChatRoom).userIds + `,${id}`,
      },
    });
    await this.prisma.$transaction([joinGroup, addChatRoom, chatRoomAddUser]);
    return 'create success';
  }
}
