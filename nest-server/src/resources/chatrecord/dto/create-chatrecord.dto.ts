import { IsString } from 'class-validator';

export class CreateChatrecordDto {
  @IsString()
  senderId: string;

  @IsString()
  receivevrId: string;

  @IsString()
  chatRoomId: string;
}
