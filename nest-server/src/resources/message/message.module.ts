import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { MessageController } from './message.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatroomService } from '../chatroom/chatroom.service';
import { GroupService } from '../group/group.service';
import { UserService } from '../user/user.service';

@Module({
  providers: [
    MessageService,
    MessageGateway,
    PrismaService,
    ChatroomService,
    GroupService,
    UserService,
  ],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
