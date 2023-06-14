import { Injectable, NotFoundException } from '@nestjs/common';
import { State } from 'src/common/enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';

@Injectable()
export class FriendService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createFriendDto: CreateFriendDto, userId: string) {
    const email = createFriendDto.email;
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException(`${email}并不存在`);
    }
    await this.prisma.userFriend.create({
      data: { userId, friendId: user.id },
    });
    return 'create success';
  }

  findAll(id: string) {
    return this.prisma.userFriend.findMany({
      where: {
        OR: [{ userId: id, friendId: id }],
        state: State.Agree,
      },
    });
  }

  async invitedInfo(id: string) {
    const userInfo = await this.prisma.$queryRaw`
    SELECT 
      userfriend.id,
      name,
      avatar,
      email,
      userfriend.createAt as createdAt
    FROM User
    INNER JOIN UserFriend ON User.id = UserFriend.userId AND UserFriend.state = ${State.Pending}
    WHERE UserFriend.friendId = ${id}
  `;
    console.info(userInfo);
    return userInfo;
  }

  async update(id: string, updateFriendDto: UpdateFriendDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: updateFriendDto.email },
    });
    await this.prisma.userFriend.update({
      where: {
        userId: user.id,
        otherId: id,
      },
      data: {
        state: updateFriendDto.state,
      },
    });
    return 'update success';
  }

  remove(id: number) {
    return `This action removes a #${id} friend`;
  }
}
