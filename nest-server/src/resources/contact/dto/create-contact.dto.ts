import { IsNumber } from 'class-validator';
import { YesNotState } from 'src/common/enum';

export class CreateContactDto {
  readonly id: number;

  @IsNumber()
  user_id: number;

  @IsNumber()
  iscare: YesNotState;

  @IsNumber()
  isagree: YesNotState;
}
