import { IsOptional, IsString } from 'class-validator';

export class CreateImageDto {
  @IsString()
  path: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  userId: string;

  @IsString()
  @IsOptional()
  cloudFileId: string;
}
