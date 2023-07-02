import { Module } from '@nestjs/common';
import { ClouddocumentService } from './clouddocument.service';
import { ClouddocumentController } from './clouddocument.controller';

@Module({
  controllers: [ClouddocumentController],
  providers: [ClouddocumentService]
})
export class ClouddocumentModule {}
