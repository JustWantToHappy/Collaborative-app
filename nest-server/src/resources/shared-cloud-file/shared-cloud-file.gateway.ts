import { Server, Socket } from 'socket.io';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UserService } from '../user/user.service';
import { EditingPeopleService } from './editing-people.service';

@WebSocketGateway({
  port: 8080,
  namespace: '/shared',
  cors: { origin: /.*/ },
})
export class SharedCloudFileGateway {
  @WebSocketServer() private io: Server;

  constructor(
    private readonly userService: UserService,
    private readonly editingPeopleService: EditingPeopleService,
  ) {}

  //用户断开连接时
  async handleDisconnect(client: Socket) {
    const { documentId, userId } = client.data;
    const success = this.editingPeopleService.leave(documentId, userId);
    console.info(
      this.editingPeopleService.editingPeopleCount(documentId),
      'leave',
    );
    if (success) {
      const user = await this.userService.findOne(userId);
      this.io.in(documentId).emit('leave', {
        userId,
        name: user.name,
      });
    }
  }

  //加入编辑
  @SubscribeMessage('join')
  async handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { userId: string; documentId: string },
  ) {
    const { documentId, userId } = body;
    client.data = body;
    client.join(documentId);
    this.editingPeopleService.join(documentId, userId);
    const user = await this.userService.findOne(userId);
    client.in(documentId).emit('join', { userId, name: user.name });
    console.info(
      this.editingPeopleService.editingPeopleCount(documentId),
      'join',
    );
    return this.editingPeopleService.editingPeopleCount(documentId);
  }

  //离开编辑
  @SubscribeMessage('leave')
  async handleLeave(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { userId: string; documentId: string },
  ) {
    const { documentId, userId } = body;
    client.leave(documentId);
    this.editingPeopleService.leave(documentId, userId);
    const user = await this.userService.findOne(userId);
    client.in(documentId).emit('leave', { userId, name: user.name });
  }
}
