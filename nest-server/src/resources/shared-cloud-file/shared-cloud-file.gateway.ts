import { Socket } from 'socket.io';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { UserService } from '../user/user.service';

@WebSocketGateway({
  port: 8080,
  namespace: '/shared',
  cors: { origin: /.*/ },
})
export class SharedCloudFileGateway {
  constructor(private readonly userService: UserService) {}

  //加入编辑
  @SubscribeMessage('join')
  async handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { userId: string; documentId: string },
  ) {
    const { documentId, userId } = body;
    client.join(documentId);
    const user = await this.userService.findOne(userId);
    client.in(documentId).emit('join', { userId, name: user.name });
  }

  //离开编辑
  @SubscribeMessage('leave')
  async handleLeave(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { userId: string; documentId: string },
  ) {
    console.info('leave');
    const { documentId, userId } = body;
    client.leave(documentId);
    const user = await this.userService.findOne(userId);
    client.in(documentId).emit('leave', { userId, name: user.name });
  }
}
