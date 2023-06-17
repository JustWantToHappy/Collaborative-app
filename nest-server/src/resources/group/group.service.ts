import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { State } from 'src/common/enum';
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
        UserGroups: {
          create: [{ userId: createGroupDto.leaderId, state: State.Agree }],
        },
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
    const result = await this.prisma.userGroup.findMany({
      where: { userId: id },
      include: {
        group: {
          select: {
            name: true,
            avatar: true,
            description: true,
            createdAt: true,
          },
        },
      },
    });
    return result.map((usergroup) => usergroup.group);
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
    const usergroup = await this.prisma.userGroup.findUnique({
      where: {
        userId_groupId: {
          userId: id,
          groupId: group.id,
        },
      },
    });
    if (usergroup) {
      throw new HttpException('你已加入该团队', HttpStatus.CONFLICT);
    }
    //方便测试，这里用户只要申请了就可以加入团队
    const joinGroup = this.prisma.userGroup.create({
      data: {
        userId: id,
        groupId: group.id,
        state: State.Agree,
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
