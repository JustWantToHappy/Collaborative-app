import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Dialog } from 'src/common/enum';

export class CreateMessageDto {
  readonly id: number;

  @IsNumber()
  conversation_id: number;

  @IsString()
  @IsOptional()
  text: string;

  @IsEnum(Dialog)
  type: Dialog;

  @IsNumber()
  @IsOptional()
  image_id: number;

  @IsNumber()
  sender_id: number;

  @IsNumber()
  recipient_id;
}
