import { forwardRef, Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendGateway } from './friend.gateway';
import { MessageModule } from '../message/message.module';
import { FriendController } from './friend.controller';
import { UserService } from '../user/user.service';
import { ChatroomService } from '../chatroom/chatroom.service';
import { GroupService } from '../group/group.service';

@Module({
  //1.MessageService中注入了其他service依赖，如果使用providers注册，其他service也需要注册
  //2.直接导入MessageModule,然后在MessageModule中导出MessageService即可
  imports: [forwardRef(() => MessageModule)], //使用forwardRef是延迟加载module，避免循环依赖
  providers: [
    FriendService,
    PrismaService,
    FriendGateway,
    UserService,
    ChatroomService,
    GroupService,
  ],
  exports: [FriendService],
  controllers: [FriendController],
})
export class FriendModule {}
