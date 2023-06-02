import { BadRequestException } from '@nestjs/common';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { YesNotState } from 'src/common/enum';

export class CreateKnowledgeBaseDto {
  readonly id: number;

  @IsString()
  title: string;

  @IsNumber()
  user_id: number;

  @IsNumber()
  is_shared: YesNotState;

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
  is_deleted: YesNotState;
}
