import { IsString } from 'class-validator';
import { BaseDto } from 'src/common/base/base.dto';

export class CreateUserDto extends BaseDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  avatar: string;
}
