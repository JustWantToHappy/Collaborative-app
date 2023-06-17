import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FriendService } from './friend.service';

@WebSocketGateway({ cors: true, port: 8080, namespace: 'friend' })
export class FriendGateway {
  @WebSocketServer() private ws: Server;
  constructor(private readonly friendService: FriendService) {}
  @SubscribeMessage('invite')
  async handleApply(@MessageBody() email: string) {
    /*  this.ws.emit(`${user?.id}invite`, {
      message: {
        avatar: user.avatar,
        email: user.email,
        id: user.id,
        name: user.name,
      },
    });*/
  }
}
