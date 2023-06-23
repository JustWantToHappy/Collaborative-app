import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomController } from './chatroom.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatRoomGateway } from './chatroom.gateway';
import { MessageService } from '../message/message.service';
import { GroupService } from '../group/group.service';
import { UserService } from '../user/user.service';

@Module({
  controllers: [ChatroomController],
  providers: [
    ChatroomService,
    PrismaService,
    ChatRoomGateway,
    MessageService,
    GroupService,
    UserService,
  ],
})
export class ChatroomModule {}
