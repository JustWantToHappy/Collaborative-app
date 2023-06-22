import { Body, Controller, Get, Param, Patch, Request } from '@nestjs/common';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Get()
  findAllPending(@Request() request) {
    return this.messageService.findAllPending(request.user.id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() request,
    @Body() body: UpdateMessageDto,
  ) {
    return this.messageService.update(id, request.user.id, body);
  }
}
