import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageType, State } from 'src/common/enum';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMessageDto: CreateMessageDto) {
    await this.prisma.message.create({ data: createMessageDto });
  }

  findAllPending(id: string) {
    const query = this.prisma.$queryRaw`
      select user.name,user.avatar,message.createdAt,thirdPartyId,type from user
      inner join message on message.senderId=user.id and receiverId=${id}
      where state=${State.Pending}
    `;
    return query;
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
