import { Injectable } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
@Injectable()
export class OnOffLineService {
  constructor(private readonly chatRoomService: ChatroomService) {}

  private readonly onlinePersons = {
    socketUser: new Map<string, string>(),
    userSocket: new Map<string, string>(),
  };

  //上线
  public online(socketId: string, userId: string) {
    if (this.userIsOnline(userId)) {
      return;
    }
    this.onlinePersons.socketUser.set(socketId, userId);
    this.onlinePersons.userSocket.set(userId, socketId);
  }

  //离线
  public offline(socketId: string) {
    const userId = this.onlinePersons.socketUser.get(socketId);
    this.onlinePersons.socketUser.delete(socketId);
    this.onlinePersons.userSocket.delete(userId);
  }

  //获取socketId对应的userId
  public getUserId(socketId: string) {
    return this.onlinePersons.socketUser.get(socketId) ?? '';
  }

  //检测某个用户是否在线
  public userIsOnline(userId: string) {
    return (this.onlinePersons.userSocket.get(userId) ?? '') !== '';
  }

  //获取某个房间的所有在线人员
  public async getChatRoomOnlines(chatRoomId: string) {
    const userIds = await this.chatRoomService.findUsersByChatRoomId(
      chatRoomId,
    );
    return userIds.users
      .map((user) => user.id)
      .filter((userId) => this.userIsOnline(userId));
  }
}
