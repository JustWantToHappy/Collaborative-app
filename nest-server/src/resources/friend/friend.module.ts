import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendGateway } from './friend.gateway';
import { UserService } from '../user/user.service';

@Module({
  controllers: [FriendController],
  providers: [FriendService, PrismaService, FriendGateway, UserService],
})
export class FriendModule {}
