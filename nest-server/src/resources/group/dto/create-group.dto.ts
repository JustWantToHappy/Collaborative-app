import { State } from '@hapi/joi';
import { Optional } from '@nestjs/common';
import { IsNumber, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @Optional()
  leaderId: string;

  @IsString()
  avatar: string;

  @Optional()
  state: State;

  @IsString()
  thirdPartyId?: string;

  @IsNumber()
  isread: number;
}
