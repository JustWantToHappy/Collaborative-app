import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFriendDto } from '../friend/dto/create-friend.dto';
import { FriendService } from '../friend/friend.service';
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
    private readonly friendService: FriendService,
    private readonly prisma: PrismaService,
  ) {}
  /**
   * 好友申请
   */
  @SubscribeMessage('applyfriend')
  async handleMessage(@MessageBody() body: CreateFriendDto) {
    const apply = await this.friendService.create(body.id, body.email);
    const user = await this.prisma.user.findUnique({
      where: { email: body.email },
    });
    return { msg: apply, receiverId: user.id };
  }
  /**
   * 根据用户id获取当前用户的实时消息
   */
  @SubscribeMessage('fetchMessage')
  async fetchMessage(@MessageBody() id: string) {
    const messages = await this.messageService.findAllPending(id);
    this.ws.emit(`${id}fetchMessage`, messages);
  }
}
