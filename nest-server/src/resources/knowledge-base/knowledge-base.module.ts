import { Module } from '@nestjs/common';
import { KnowledgeBaseService } from './knowledge-base.service';
import { KnowledgeBaseController } from './knowledge-base.controller';

@Module({
  controllers: [KnowledgeBaseController],
  providers: [KnowledgeBaseService]
})
export class KnowledgeBaseModule {}
