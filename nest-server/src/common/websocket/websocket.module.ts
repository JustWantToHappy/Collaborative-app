import { Module } from '@nestjs/common';
import { ChatGroup } from './chat-group.gateway';
import { ChatPrivate } from './chat-private.gateway';
import { CommonGateWay } from './common.gateway';

@Module({
  providers: [CommonGateWay, ChatGroup, ChatPrivate],
})
export class WebsocketModule {}
