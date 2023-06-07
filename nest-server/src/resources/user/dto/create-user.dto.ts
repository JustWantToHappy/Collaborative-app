import { ArrayUnique, IsArray, IsOptional, IsString } from 'class-validator';
import { BaseDto } from 'src/common/base/base.dto';
import { Role } from 'src/common/enum';

export class CreateUserDto extends BaseDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsArray()
  //ArrayUnique用来检查数组中元素是否唯一。
  @ArrayUnique()
  @IsOptional()
  roles: Role[];
}
