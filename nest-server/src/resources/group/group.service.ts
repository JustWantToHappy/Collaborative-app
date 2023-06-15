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
    await this.prisma.group.create({
      data: {
        ...createGroupDto,
        UserGroup: {
          create: [{ userId: createGroupDto.leaderId, state: State.Agree }],
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
    const result = await this.prisma.userGroup.create({
      data: {
        userId: id,
        groupId: group.id,
        state: State.Agree, //为了后面测试，之后改回pendign
      },
    });
    return 'create success';
  }

  groupApply(id: string) {}
}
