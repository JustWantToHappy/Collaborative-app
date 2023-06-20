import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageService } from './message.service';

@WebSocketGateway({
  cors: true,
  port: 8080,
  namespace: '/message',
})
export class MessageGateway {
  @WebSocketServer() private ws: Server;
  constructor(private readonly messageService: MessageService) {}
  /**
   * 根据用户id获取当前用户的实时消息
   */
  @SubscribeMessage('fetchMessage')
  async fetchMessage(@MessageBody() id: string) {
    const messages = await this.messageService.findAllPending(id);
    this.ws.emit(`${id}fetchMessage`, messages);
  }
}
