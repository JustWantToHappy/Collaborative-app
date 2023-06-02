import { IsNumber, IsString } from 'class-validator';
import { BaseDto } from 'src/common/base/base.dto';

export class CreateTeamDto extends BaseDto {
  @IsNumber()
  leader_id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  avatar: string;
}
