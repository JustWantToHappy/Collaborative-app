import { BadRequestException } from '@nestjs/common';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class BaseDto {
  readonly id: number;

  @Transform((value: TransformFnParams) => {
    const date = new Date(value.obj.create_at);
    if (isNaN(date.getTime())) {
      throw new BadRequestException(`${value} is not a valid date`);
    }
    return date;
  })
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  create_at: Date;

  @Transform((value: TransformFnParams) => {
    const date = new Date(value.obj.create_at);
    if (isNaN(date.getTime())) {
      throw new BadRequestException(`${value} is not a valid date`);
    }
    return date;
  })
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  update_at: Date;
}
