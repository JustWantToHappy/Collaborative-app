import { BaseDto } from 'src/common/base/base.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTeamDto extends BaseDto {
  @IsNumber()
  @IsOptional()
  leader_id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  avatar: string;
}
