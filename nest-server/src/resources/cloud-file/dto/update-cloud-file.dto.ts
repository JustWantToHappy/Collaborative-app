import { PartialType } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { CreateCloudFileDto } from './create-cloud-file.dto';

export class UpdateCloudFileDto extends PartialType(CreateCloudFileDto) {
  @IsString()
  @IsOptional()
  text: string;

  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
