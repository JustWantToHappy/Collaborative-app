import { Injectable } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';

@Injectable()
export class OnOffLineService {
  constructor(private readonly chatRoomService: ChatroomService) {}

  private readonly onlinePersons = {
    socketUser: new Map<string, string>(),
    userSocket: new Map<string, string>(),
  };

  //上线时...
  public online(socketId: string, userId: string) {
    this.onlinePersons.socketUser.set(socketId, userId);
    this.onlinePersons.userSocket.set(userId, socketId);
  }

  //离线时...
  public offline(socketId: string) {
    const userId = this.onlinePersons.socketUser.get(socketId);
    this.onlinePersons.socketUser.delete(socketId);
    this.onlinePersons.userSocket.delete(userId);
  }

  //检测某个用户是否在线
  public userIsOnline(userId: string) {
    return (this.onlinePersons.userSocket.get(userId) ?? '') !== '';
  }

  //获取某个房间的在线人员
  public async getChatRoomOnlines(chatRoomId: string) {
    const userIds = await this.chatRoomService.findUsersByChatRoomId(
      chatRoomId,
    );
    return userIds.users
      .map((user) => user.id)
      .filter((userId) => this.userIsOnline(userId));
  }
}
