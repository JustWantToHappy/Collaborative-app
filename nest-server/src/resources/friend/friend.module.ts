import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendGateway } from './friend.gateway';
import { MessageService } from '../message/message.service';

@Module({
  providers: [FriendService, PrismaService, FriendGateway, MessageService],
})
export class FriendModule {}
