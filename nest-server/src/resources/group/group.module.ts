import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatroomService } from '../chatroom/chatroom.service';
import { UserService } from '../user/user.service';

@Module({
  controllers: [GroupController],
  providers: [GroupService, PrismaService, ChatroomService, UserService],
})
export class GroupModule {}
