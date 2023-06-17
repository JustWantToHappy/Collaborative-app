import { Injectable } from '@nestjs/common';
import { CreateChatrecordDto } from './dto/create-chatrecord.dto';
import { UpdateChatrecordDto } from './dto/update-chatrecord.dto';

@Injectable()
export class ChatrecordService {
  create(createChatrecordDto: CreateChatrecordDto) {
    return 'This action adds a new chatrecord';
  }

  findAll() {
    return `This action returns all chatrecord`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatrecord`;
  }

  update(id: number, updateChatrecordDto: UpdateChatrecordDto) {
    return `This action updates a #${id} chatrecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatrecord`;
  }
}
