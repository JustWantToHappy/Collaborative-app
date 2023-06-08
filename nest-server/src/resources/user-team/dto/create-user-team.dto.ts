import { IsNumber } from 'class-validator';
import { YesNotState } from 'src/common/enum';

export class CreateUserTeamDto {
  readonly id: number;

  @IsNumber()
  user_id: number;

  @IsNumber()
  team_id: number;

  @IsNumber()
  isagree: YesNotState;
}
