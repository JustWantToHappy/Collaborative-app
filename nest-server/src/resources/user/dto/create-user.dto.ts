import { IsString } from 'class-validator';

export class CreateUserDto {
  readonly id: number;
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  avatar: string;
}
