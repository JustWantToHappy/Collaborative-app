import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageType } from 'src/common/enum';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMessageDto: CreateMessageDto) {
    await this.prisma.message.create({ data: createMessageDto });
  }

  findAll() {
    return `This action returns all message`;
  }

  findOne(senderId: string, receiverId: string, type: MessageType) {
    return this.prisma.message.findFirst({
      where: { senderId, receiverId, type },
    });
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
