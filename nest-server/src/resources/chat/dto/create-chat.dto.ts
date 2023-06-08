import { IsNumber, IsString } from 'class-validator';
import { YesNotState } from 'src/common/enum';
import { BaseDto } from '../../../common/base/base.dto';

export class CreateChatDto extends BaseDto {
  @IsNumber()
  team_id: number;

  @IsNumber()
  from_user_id: number;

  @IsNumber()
  to_user_id: number;

  @IsString()
  content: string;

  @IsNumber()
  type: YesNotState;

  @IsNumber()
  isread: YesNotState;
}
