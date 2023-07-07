import { Module } from '@nestjs/common';
import { SharedCloudFileService } from './shared-cloud-file.service';
import { SharedCloudFileController } from './shared-cloud-file.controller';
import { CloudFileService } from '../cloud-file/cloud-file.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { SharedCloudFileGateway } from './shared-cloud-file.gateway';

@Module({
  controllers: [SharedCloudFileController],
  providers: [
    SharedCloudFileService,
    PrismaService,
    CloudFileService,
    UserService,
    SharedCloudFileGateway,
  ],
})
export class SharedCloudFileModule {}
