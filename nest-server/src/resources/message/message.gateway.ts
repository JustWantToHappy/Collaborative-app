import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageService } from './message.service';

@WebSocketGateway({ cors: true, port: 8080, namespace: 'message' })
export class MessageGateway {
  @WebSocketServer() private ws: Server;
  constructor(private readonly messageService: MessageService) {}
  /**
   * 根据用户id获取当前用户的实时消息
   */
  @SubscribeMessage('fetchMessage')
  handleMessage(@MessageBody() message: UpdateMessageDto): string {
    return 'Hello world!';
  }
}
