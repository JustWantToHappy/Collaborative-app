import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';

export class CreateChatroomDto {
  @IsString()
  userIds: string;

  @Optional()
  name?: string;

  @IsString()
  type: string;

  @Optional()
  groupId?: string;

  @Optional()
  userId: string;
}
