import { IsOptional, IsString } from 'class-validator';

export class CreateSharedCloudFileDto {
  @IsString()
  @IsOptional()
  text: string;
}
