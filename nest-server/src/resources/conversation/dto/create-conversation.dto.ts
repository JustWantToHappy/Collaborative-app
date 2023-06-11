import { IsNumber } from 'class-validator';
import { BaseDto } from 'src/common/base/base.dto';
import { YesNotState } from 'src/common/enum';

export class CreateConversationDto extends BaseDto {
  @IsNumber()
  type: YesNotState;
}
