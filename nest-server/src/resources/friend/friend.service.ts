import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ChatRoom, State } from 'src/common/enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';

@Injectable()
export class FriendService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createFriendDto: CreateFriendDto, id: string) {
    const email = createFriendDto.email;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new HttpException(`${email}并不存在`, HttpStatus.NOT_FOUND);
    }
    const userfriend = await this.prisma.userFriend.findFirst({
      where: {
        OR: [
          { userId: user.id, friendId: id },
          { userId: id, friendId: user.id },
        ],
      },
    });
    const state = userfriend?.state;
    if (state === State.Pending) {
      throw new HttpException('你已经邀请过此用户！', HttpStatus.BAD_REQUEST);
    } else if (state === State.Agree) {
      throw new HttpException('好友关系已存在！', HttpStatus.CONFLICT);
    }
    await this.prisma.userFriend.create({
      data: { userId: id, friendId: user.id },
    });
    return 'create success';
  }

  async findAll(id: string) {
    const result = await this.prisma.$queryRaw`
      SELECT
        userFriend.id,
        name,
        avatar,
        email
        FROM User
      INNER JOIN userFriend ON user.id=userFriend.userId OR user.id=userFriend.friendId
       WHERE user.id!=${id} AND state=${State.Agree}
    `;
    return result;
  }

  async invitedInfo(id: string) {
    const userInfo = await this.prisma.$queryRaw`
    SELECT 
      userfriend.id,
      name,
      avatar,
      email,
      userfriend.createdAt
    FROM User
    INNER JOIN UserFriend ON User.id = UserFriend.userId AND UserFriend.state = ${State.Pending}
    WHERE UserFriend.friendId = ${id}
  `;
    return userInfo;
  }

  async update(id: string, updateFriendDto: UpdateFriendDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: updateFriendDto.email },
    });
    //创建好友关系的时候同时创建一个房间
    const addFriend = this.prisma.userFriend.update({
      where: {
        userId_friendId: {
          userId: user.id,
          friendId: id,
        },
      },
      data: {
        state: updateFriendDto.state,
      },
    });
    const chatRoom = this.prisma.chatRoom.create({
      data: {
        userIds: [user.id, id].join(','),
        type: ChatRoom.Private,
      },
    });
    await this.prisma.$transaction([addFriend, chatRoom]);
    return 'update success';
  }

  remove(id: string) {
    return this.prisma.userFriend.delete({ where: { id } });
  }
}
