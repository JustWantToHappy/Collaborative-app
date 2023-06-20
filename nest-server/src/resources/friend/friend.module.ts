import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageService } from '../message/message.service';

@Module({
  providers: [FriendService, PrismaService, MessageService, PrismaService],
})
export class FriendModule {}
