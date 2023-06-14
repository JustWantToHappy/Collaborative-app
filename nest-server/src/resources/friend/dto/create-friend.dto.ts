import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';

export class CreateFriendDto {
  @IsString()
  email: string;
  @Optional()
  state: string;
}
