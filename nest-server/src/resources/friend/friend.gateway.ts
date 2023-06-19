import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateFriendDto } from './dto/create-friend.dto';
import { FriendService } from './friend.service';

@WebSocketGateway({ cors: true, port: 8080, namespace: 'friend' })
export class FriendGateway {
  @WebSocketServer() private ws: Server;
  constructor(private readonly friendService: FriendService) {}
  @SubscribeMessage('applyfriend')
  async handleMessage(@MessageBody() body: CreateFriendDto) {
    const apply = await this.friendService.create(body.id, body.email);
    this.ws.emit(`${body.id}applyfriend`, apply);
  }
}
