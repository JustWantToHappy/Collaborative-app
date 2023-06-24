import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Chat, FileType, State } from 'src/common/enum';
import { MessageService } from '../message/message.service';
import { UserService } from '../user/user.service';
import { ChatroomService } from './chatroom.service';
import { ChatrecordDto } from './dto/chatrecord.dto';
import { CreateMessageDto } from '../message/dto/create-message.dto';

/**
 * chatRoom包含了群聊和私聊
 */

@WebSocketGateway({ cors: true, port: 8080, namespace: '/chatroom' })
export class ChatRoomGateway {
  constructor(
    private readonly chatRoomService: ChatroomService,
    private readonly messageService: MessageService,
    private readonly userService: UserService,
  ) {}
  handleConnection(client: Socket) {
    console.log(`Client ${client.id} connected`);
  }
  //当应用程序断开连接时
  handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected`);
    //用户离线，通知其他客服端
    client.rooms.forEach((room) => {
      client.leave(room);
      client.to(room).emit(Chat.Leave, room, client.id);
    });
  }

  //将用户加入房间...
  @SubscribeMessage(Chat.Join)
  async onJoinRoom(client: Socket, userId: string) {
    const rooms = await this.chatRoomService.findAllChatRoomId(userId);
    rooms.forEach((room) => {
      client.join(room.id);
      client.to(room.id).emit(Chat.Join, room.id, userId);
    });
  }

  //当用户离开房间(用户主动断开连接)...
  @SubscribeMessage(Chat.Leave)
  async onLeaveRoom(client: Socket, userId: string) {
    const rooms = await this.chatRoomService.findAllChatRoomId(userId);
    rooms.forEach((room) => {
      client.leave(room.id);
      client.to(room.id).emit(Chat.Leave, room.id, client.id);
    });
  }

  //当用户发送消息的时候...
  @SubscribeMessage(Chat.Message)
  async onChatMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    body: {
      senderId: string;
      receiverId: string;
      chatRoomId: string;
      text: string;
      fileType: FileType;
    },
  ) {
    const user = await this.userService.findOne(body.senderId);
    const chatroom = await this.chatRoomService.findOne(body?.chatRoomId);
    if (chatroom) {
      chatroom.type === 'private' &&
        (function () {
          const userIds = chatroom.userIds.split(',');
          body.receiverId =
            userIds[0] === body.senderId ? userIds[1] : userIds[0];
        })();
      const createMessage: CreateMessageDto = {
        ...body,
        state: State.Agree,
      };
      const message = await this.messageService.create(createMessage);
      if (message) {
        const res: ChatrecordDto = Object.assign(body, {
          id: message.id,
          name: user.name,
          avatar: user.avatar,
          createdAt: message.createdAt,
        });
        client.to(body.chatRoomId).emit(Chat.Message, res);
      }
    } else {
      return '发送失败';
    }
  }
}
