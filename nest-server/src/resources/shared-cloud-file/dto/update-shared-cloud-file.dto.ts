import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, IsDate, IsNumber } from 'class-validator';
import { CreateSharedCloudFileDto } from './create-shared-cloud-file.dto';

export class UpdateSharedCloudFileDto extends PartialType(
  CreateSharedCloudFileDto,
) {
  @IsString()
  @IsOptional()
  text: string;

  @IsDate()
  @IsOptional()
  updatedAt: Date;

  @IsNumber()
  @IsOptional()
  version: number;
}
