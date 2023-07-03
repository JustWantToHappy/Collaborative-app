import { Module } from '@nestjs/common';
import { CloudFileService } from './cloud-file.service';
import { CloudFileController } from './cloud-file.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CloudFileController],
  providers: [CloudFileService, PrismaService],
})
export class CloudFileModule {}
