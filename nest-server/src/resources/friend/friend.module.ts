import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageService } from '../message/message.service';
import { FriendGateway } from './friend.gateway';

@Module({
  providers: [FriendService, PrismaService, MessageService, FriendGateway],
})
export class FriendModule {}
