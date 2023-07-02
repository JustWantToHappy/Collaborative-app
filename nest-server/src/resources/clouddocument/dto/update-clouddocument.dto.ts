import { PartialType } from '@nestjs/swagger';
import { CreateClouddocumentDto } from './create-clouddocument.dto';

export class UpdateClouddocumentDto extends PartialType(CreateClouddocumentDto) {}
