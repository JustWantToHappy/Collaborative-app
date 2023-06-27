import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { FriendService } from './friend.service';

@WebSocketGateway({
  cors: { origin: /.*/, credentials: true },
  port: 8080,
  namespace: '/friend',
})
export class FriendGateway {
  constructor(
    private readonly friendService: FriendService,
    private readonly prisma: PrismaService,
  ) {}
  /**
   * 好友申请
   */
  @SubscribeMessage('applyfriend')
  async handleApplyFriend(@MessageBody() body: CreateFriendDto) {
    const apply = await this.friendService.create(body.id, body.email);
    const user = await this.prisma.user.findUnique({
      where: { email: body.email },
    });
    return { msg: apply, receiverId: user?.id };
  }
}
