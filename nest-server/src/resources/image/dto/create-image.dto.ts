import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';

export class CreateImageDto {
  readonly id: number;

  @IsString()
  name: string;

  @IsString()
  @Optional()
  path: string;
}
