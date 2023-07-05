import { Injectable } from '@nestjs/common';
import { CreateSharedCloudFileDto } from './dto/create-shared-cloud-file.dto';
import { UpdateSharedCloudFileDto } from './dto/update-shared-cloud-file.dto';

@Injectable()
export class SharedCloudFileService {
  create(createSharedCloudFileDto: CreateSharedCloudFileDto) {
    return 'This action adds a new sharedCloudFile';
  }

  findAll() {
    return `This action returns all sharedCloudFile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sharedCloudFile`;
  }

  update(id: number, updateSharedCloudFileDto: UpdateSharedCloudFileDto) {
    return `This action updates a #${id} sharedCloudFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} sharedCloudFile`;
  }
}
