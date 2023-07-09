import { Module } from '@nestjs/common';
import { ChatrecordService } from './chatrecord.service';
import { ChatrecordController } from './chatrecord.controller';

@Module({
  controllers: [ChatrecordController],
  providers: [ChatrecordService],
})
export class ChatrecordModule {}
