import { PartialType } from '@nestjs/swagger';
import { CreateSharedCloudFileDto } from './create-shared-cloud-file.dto';

export class UpdateSharedCloudFileDto extends PartialType(CreateSharedCloudFileDto) {}
