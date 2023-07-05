import { Module } from '@nestjs/common';
import { SharedCloudFileService } from './shared-cloud-file.service';
import { SharedCloudFileController } from './shared-cloud-file.controller';

@Module({
  controllers: [SharedCloudFileController],
  providers: [SharedCloudFileService]
})
export class SharedCloudFileModule {}
