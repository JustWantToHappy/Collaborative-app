import { BadRequestException } from '@nestjs/common';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateTeamDto {
  readonly id: number;

  @IsNumber()
  leader_id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  avatar: string;

  @Transform((value: TransformFnParams) => {
    const date = new Date(value.obj.create_at);
    if (isNaN(date.getTime())) {
      throw new BadRequestException(`${value} is not a valid date`);
    }
    return date;
  })
  @Type(() => Date)
  @IsDate()
  create_at: Date;
}
