import { IsNumber } from 'class-validator';
import { YesNotState } from 'src/common/enum';

export class CreateContactDto {
  readonly id: number;

  @IsNumber()
  user_id: number;

  @IsNumber()
  is_care: YesNotState;
}