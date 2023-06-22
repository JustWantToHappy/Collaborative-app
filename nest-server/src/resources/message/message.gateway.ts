import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageService } from './message.service';

@WebSocketGateway({
  cors: true,
  port: 8080,
  namespace: '/message',
})
export class MessageGateway {
  @WebSocketServer() private ws: Server;
  constructor(
    private readonly messageService: MessageService,
    private readonly prisma: PrismaService,
  ) {}
  /**
   * 根据用户id获取当前用户的实时通知
   */
  @SubscribeMessage('fetchMessage')
  async fetchMessage(@MessageBody() id: string) {
    const messages = await this.messageService.findAllPending(id);
    this.ws.emit(`${id}fetchMessage`, messages);
  }
  /**
   * 获取用户最新的聊天列表
   */
  @SubscribeMessage('fetchChatList')
  async fetchChatList(@MessageBody() id: string) {
    //
  }
}
