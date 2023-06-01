import { IsNumber } from 'class-validator';

export class CreateUserTeamDto {
  readonly id: number;

  @IsNumber()
  user_id: number;

  @IsNumber()
  team_id: number;
}
