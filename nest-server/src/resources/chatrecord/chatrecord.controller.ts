import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChatrecordService } from './chatrecord.service';
import { CreateChatrecordDto } from './dto/create-chatrecord.dto';
import { UpdateChatrecordDto } from './dto/update-chatrecord.dto';

@Controller('chatrecord')
export class ChatrecordController {
  constructor(private readonly chatrecordService: ChatrecordService) {}

  @Post('text')
  create(@Body() createChatrecordDto: CreateChatrecordDto) {
    return this.chatrecordService.create(createChatrecordDto);
  }

  @Get()
  findAll() {
    return this.chatrecordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatrecordService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChatrecordDto: UpdateChatrecordDto,
  ) {
    return this.chatrecordService.update(+id, updateChatrecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatrecordService.remove(+id);
  }
}
