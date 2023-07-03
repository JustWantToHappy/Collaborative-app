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

  @IsString()
  description: string;
}
