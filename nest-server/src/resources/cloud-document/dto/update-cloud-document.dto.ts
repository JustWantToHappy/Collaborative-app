import { PartialType } from '@nestjs/swagger';
import { CreateCloudDocumentDto } from './create-cloud-document.dto';

export class UpdateCloudDocumentDto extends PartialType(CreateCloudDocumentDto) {}
