import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { CreateChatroomDto } from './dto/create-chatroom.dto';

@Controller('chatroom')
export class ChatroomController {
  constructor(private readonly chatroomService: ChatroomService) {}

  @Post()
  create(@Body() createChatroomDto: CreateChatroomDto) {
    return this.chatroomService.create(createChatroomDto);
  }

  @Get()
  findAll(@Request() request) {
    return this.chatroomService.findAll(request.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatroomService.findOne(id);
  }

  @Get('records/:id')
  findChatRecordsByChatRoomId(@Param('id') id: string) {
    return this.chatroomService.findChatRecordsByChatRoomId(id);
  }

  @Get('users/:id')
  findUsersByChatRoomId(@Param('id') id: string) {
    return this.chatroomService.findUsersByChatRoomId(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatroomService.remove(id);
  }
}
