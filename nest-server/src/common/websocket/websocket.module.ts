import { Module } from '@nestjs/common';
import { CommonGateWay } from './common.gateway';

@Module({
  providers: [CommonGateWay],
})
export class WebsocketModule {}
