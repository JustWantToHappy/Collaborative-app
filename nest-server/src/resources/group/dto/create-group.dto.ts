import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @Optional()
  leaderId: string;

  @IsString()
  avatar: string;
}
