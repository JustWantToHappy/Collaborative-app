import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Chat, FileType, State } from 'src/common/enum';
import { MessageService } from '../message/message.service';
import { UserService } from '../user/user.service';
import { ChatroomService } from './chatroom.service';
import { ChatrecordDto } from './dto/chatrecord.dto';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { JwtService } from '@nestjs/jwt';
import { OnOffLineService } from './on-off-line.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard';

/**
 * chatRoom包含了群聊和私聊
 */
//@UseGuards(JwtAuthGuard) 可以给websocket进行身份验证。
@WebSocketGateway({
  cors: { origin: /.*/, credentials: true },
  port: 8080,
  path: '/chat',
  /**
   * 可以指定path:""属性创建更加复杂的应用，同时客服端需要设置path
   * 注意点:
   * 1. 如果使用了path，那么就会涉及到跨域问题，需要设置cors
   * 2. 如果只是使用namespace，啥都不需要干
   */
})
export class ChatRoomGateway implements OnGatewayConnection {
  @WebSocketServer() private io: Server;

  constructor(
    private readonly chatRoomService: ChatroomService,
    private readonly messageService: MessageService,
    private readonly userService: UserService,
    private readonly onOffLineService: OnOffLineService,
    private readonly jwtService: JwtService,
  ) {}
  //通知用户加入的所有的房间内所有其他用户
  async notifyAllUser(client: Socket, userId: string) {
    const rooms = await this.chatRoomService.findAllChatRoomId(userId);
    rooms.forEach(async (room) => {
      client.join(room.id);
      const onlines = await this.onOffLineService.getChatRoomOnlines(room.id);
      //连接断开的时候就不能够使用client.to
      this.io.in(room.id).emit(Chat.Online, onlines);
    });
  }

  handleConnection(client: Socket) {
    //console.log(`Client ${client.id} connected`);
    client.on('disconnecting', (reason) => {
      //正在断开连接...
    });
  }
  //当应用程序断开连接时
  handleDisconnect(client: Socket) {
    //console.log(`Client ${client.id} disconnected`);
    this.onOffLineService.offline(client.id); //离线
    const userId = this.onOffLineService.getUserId(client.id);
    this.notifyAllUser(client, userId);
  }

  //将socket加入所有房间...
  @SubscribeMessage(Chat.Join)
  async onJoinAllRooms(client: Socket, userId: string) {
    //console.info(`Client ${client.id} join rooms`);
    this.onOffLineService.online(client.id, userId); //上线
    this.notifyAllUser(client, userId);
  }

  //当用户离开房间(用户主动断开连接)...
  @SubscribeMessage(Chat.Leave)
  async onLeaveRoom(client: Socket, userId: string) {
    this.onOffLineService.offline(client.id); //离线
    this.notifyAllUser(client, userId);
  }

  //将socket加入指定房间
  @SubscribeMessage(Chat.JoinOne)
  async onJoinOneRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { userId: string; roomId: string },
  ) {
    client.join(body.roomId);
    client.to(body.roomId).emit(Chat.Join, body.roomId, body.userId);
  }

  //获取房间在线人员
  @SubscribeMessage(Chat.Online)
  onChatOnline(client: Socket, chatRoomId: string) {
    return this.onOffLineService.getChatRoomOnlines(chatRoomId);
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
        /*
          client.to(body.chatRoomId).emit(Chat.Message, res);//向房间内所有客服端除了发送方发送数据
          client.emit(Chat.Message, res);//向发送方自己发送数据
        */
        this.io.in(body.chatRoomId).emit(Chat.Message, res); //向房间内所有客服端发送数据
      }
    } else {
      return '发送失败';
    }
  }
}
