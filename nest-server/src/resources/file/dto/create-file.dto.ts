import { IsNumber, IsString } from 'class-validator';
import { YesNotState } from 'src/common/enum';

export class CreateFileDto {
  readonly id: number;

  @IsString()
  title: string;

  @IsNumber()
  user_id: number;

  @IsNumber()
  parent_id: number;

  @IsNumber()
  is_deleted: YesNotState;
}
