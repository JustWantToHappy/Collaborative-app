import { IsNumber } from 'class-validator';
import { CareState } from 'src/common/enum';

export class CreateContactDto {
  readonly id: number;

  @IsNumber()
  user_id: number;

  @IsNumber()
  is_care: CareState;
}
