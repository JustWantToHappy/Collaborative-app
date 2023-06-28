import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MessageType, State } from 'src/common/enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatroomService } from '../chatroom/chatroom.service';
import { GroupService } from '../group/group.service';
import { MessageService } from '../message/message.service';
import { UserService } from '../user/user.service';
import { UpdateFriendDto } from './dto/update-friend.dto';

@Injectable()
export class FriendService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    private readonly chatRoomService: ChatroomService,
    private readonly groupService: GroupService,
  ) {}
  async create(id: string, email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      return `${email}不存在`;
    }
    const message1 = await this.messageService.findOne(
      id,
      user.id,
      MessageType.ApplyFriend,
      State.Pending,
    );
    if (message1) {
      return '你已邀请此用户';
    }
    const message2 = await this.messageService.findOne(
      user.id,
      id,
      MessageType.ApplyFriend,
      State.Pending,
    );
    if (message2) {
      return '对方已对你发出好友申请';
    }
    const isFriend = await this.isFriend(id, user.id);
    if (isFriend) {
      return '好友关系已存在';
    }
    await this.messageService.create({
      senderId: id,
      receiverId: user.id,
      type: MessageType.ApplyFriend,
    });
    return '邀请成功！';
  }

  findOne(userId: string) {
    return this.prisma.friend.findUnique({ where: { userId } });
  }

  isFriend(userId: string, friendId: string) {
    return this.prisma.friend.findFirst({
      where: {
        userId,
        friendList: {
          contains: friendId,
        },
      },
    });
  }

  //用户联系人(包括好友和加入的群组)
  async findUserLinkMan(id: string) {
    const linkMan = { friends: [], groups: [] };
    const friends = await this.findUserFriends(id);
    linkMan.friends = friends;
    const chatrooms = await this.groupService.findUserJoinGroups(id);
    linkMan.groups = chatrooms.map((chatroom) => chatroom.Group);
    return linkMan;
  }

  //用户好友列表
  async findUserFriends(id: string) {
    const friendIds = (await this.findOne(id))?.friendList.split(',');
    if (friendIds?.length > 0 && friendIds.join(',') !== '') {
      const result = (
        await Promise.all(
          friendIds.map(async (friendId) => {
            const user = await this.userService.findOne(friendId);
            if (user) {
              return {
                id: user?.id,
                email: user.email,
                name: user.name,
                avatar: user.avatar,
              };
            } else {
              return null;
            }
          }),
        )
      ).filter((user) => user !== null);
      return result;
    }
    return [];
  }

  async invitedInfo(id: string) {
    return [];
  }

  async update(id: string, updateFriendDto: UpdateFriendDto) {
    return 'update success';
  }

  async deleteUserFriend(userId: string, friendId: string) {
    const a = await this.prisma.friend.findUnique({
      where: { userId },
    });
    const b = await this.prisma.friend.findUnique({
      where: { userId: friendId },
    });
    const privateChatRoom = await this.prisma.chatRoom.findFirst({
      where: { OR: [{ userId }, { userId: friendId }] },
    });
    if (a && b) {
      //删除好友之间的关系
      const deleteABRelation = this.prisma.friend.update({
        where: { userId },
        data: {
          friendList: a.friendList
            .split(',')
            .filter((userId) => userId !== b.userId)
            .join(','),
        },
      });
      const deleteBARelation = this.prisma.friend.update({
        where: { userId: friendId },
        data: {
          friendList: b.friendList
            .split(',')
            .filter((userId) => userId !== a.userId)
            .join(','),
        },
      });
      //删除好友之间的消息
      const deleteMessages = this.prisma.message.deleteMany({
        where: {
          OR: [
            { senderId: userId, receiverId: friendId },
            { senderId: friendId, receiverId: userId },
          ],
          type: MessageType.Chat,
          chatRoomId: privateChatRoom.id,
        },
      });
      //删除私用聊天室
      const deleteChatRoom = this.chatRoomService.remove(privateChatRoom.id);
      await this.prisma.$transaction([
        deleteABRelation,
        deleteBARelation,
        deleteMessages,
        deleteChatRoom,
      ]);
      return '删除成功';
    } else {
      throw new HttpException('删除失败', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
