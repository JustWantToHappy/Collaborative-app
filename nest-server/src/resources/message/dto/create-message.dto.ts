import { Optional } from '@nestjs/common';
import { IsNumber, IsString } from 'class-validator';
import { FileType, State } from 'src/common/enum';

export class CreateMessageDto {
  @IsString()
  senderId: string;

  @IsString()
  receiverId: string;

  @IsString()
  @Optional()
  text?: string;

  @IsString()
  @Optional()
  thirdPartyId?: string;

  @IsString()
  @Optional()
  state?: State;

  @IsString()
  @Optional()
  fileType?: FileType;

  @IsNumber()
  @Optional()
  isread?: number;

  @IsString()
  @Optional()
  type?: string;

  @IsString()
  @Optional()
  chatRoomId?: string;
}
