import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/upload-img.config';
//import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Get()
  findAllPending(@Request() request) {
    return this.messageService.findAllPending(request.user.id);
  }
  @Get(':chatRoomId')
  findChatRoomMessages(@Param() chatRoomId: string) {
    return this.messageService.findChatRoomMessages(chatRoomId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() request,
    @Body() body: UpdateMessageDto,
  ) {
    return this.messageService.update(id, request.user.id, body);
  }

  @Post('uploadImg')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadImg(@UploadedFile() file: Express.Multer.File) {
    return file.path;
  }
}
