import { IsNumber } from 'class-validator';
import { YesNotState } from 'src/common/enum';
import { BaseDto } from 'src/common/base/base.dto';

export class CreateContactDto extends BaseDto {
  @IsNumber()
  user_id: number;

  @IsNumber()
  other_id: number;

  @IsNumber()
  iscare: YesNotState;

  @IsNumber()
  isagree: YesNotState;
}
