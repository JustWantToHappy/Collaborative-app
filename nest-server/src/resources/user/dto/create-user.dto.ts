import { IsJSON, IsString } from 'class-validator';
import { Role } from 'src/common/enum';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsJSON()
  roles: Role;
}
