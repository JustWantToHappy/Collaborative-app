import { IsString, IsOptional } from 'class-validator';

export class CreateCloudFileDto {
  @IsOptional()
  id: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  userId: string;

  @IsString()
  @IsOptional()
  parentId: string;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  path: string;

  @IsString()
  description: string;

  @IsOptional()
  file: string; //文件
}
