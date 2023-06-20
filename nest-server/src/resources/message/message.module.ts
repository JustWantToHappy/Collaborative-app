import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageGateway } from './message.gateway';
import { MessageController } from './message.controller';
import { FriendService } from '../friend/friend.service';

@Module({
  providers: [MessageService, PrismaService, MessageGateway, FriendService],
  controllers: [MessageController],
})
export class MessageModule {}
