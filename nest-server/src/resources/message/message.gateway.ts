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
  @SubscribeMessage('fetchNotify')
  async fetchNotify(@MessageBody() id: string) {
    const messages = await this.messageService.findAllPending(id);
    this.ws.emit(`${id}fetchNotify`, messages);
  }
  /**
   * 更新用户和好友最新的聊天列表
   */
  @SubscribeMessage('fetchChatRoom')
  async fetchChatRoom(@MessageBody() id: string) {
    const message = await this.messageService.find(id);
    console.info('触发', message);
    this.ws.emit(`${message.senderId}fetchChatRoom`);
    this.ws.emit(`${message.receiverId}fetchChatRoom`);
  }
}
