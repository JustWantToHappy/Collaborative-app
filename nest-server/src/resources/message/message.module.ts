import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { MessageController } from './message.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [MessageService, MessageGateway, PrismaService],
  controllers: [MessageController],
})
export class MessageModule {}
