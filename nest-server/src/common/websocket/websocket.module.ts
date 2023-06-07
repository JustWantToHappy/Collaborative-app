import { Module } from '@nestjs/common';
import { ChatGroup } from './chat-group.gateway';
import { CommonGateWay } from './common.gateway';

@Module({
  providers: [CommonGateWay, ChatGroup],
})
export class WebsocketModule {}
