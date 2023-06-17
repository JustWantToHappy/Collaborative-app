import { PartialType } from '@nestjs/swagger';
import { CreateChatrecordDto } from './create-chatrecord.dto';

export class UpdateChatrecordDto extends PartialType(CreateChatrecordDto) {}
