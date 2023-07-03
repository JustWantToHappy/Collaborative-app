import { Module } from '@nestjs/common';
import { CloudDocumentService } from './cloud-document.service';
import { CloudDocumentController } from './cloud-document.controller';

@Module({
  controllers: [CloudDocumentController],
  providers: [CloudDocumentService]
})
export class CloudDocumentModule {}
