import { PartialType } from '@nestjs/swagger';
import { CreateCloudFileDto } from './create-cloud-file.dto';

export class UpdateCloudFileDto extends PartialType(CreateCloudFileDto) {}
