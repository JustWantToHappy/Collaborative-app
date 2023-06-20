import { Controller, Get, Request } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Get()
  findAllPending(@Request() request) {
    return this.messageService.findAllPending(request.user.id);
  }
}
