import { Injectable } from '@nestjs/common';
import { CreateCloudDocumentDto } from './dto/create-cloud-document.dto';
import { UpdateCloudDocumentDto } from './dto/update-cloud-document.dto';

@Injectable()
export class CloudDocumentService {
  create(createCloudDocumentDto: CreateCloudDocumentDto) {
    return 'This action adds a new cloudDocument';
  }

  findAll() {
    return `This action returns all cloudDocument`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cloudDocument`;
  }

  update(id: number, updateCloudDocumentDto: UpdateCloudDocumentDto) {
    return `This action updates a #${id} cloudDocument`;
  }

  remove(id: number) {
    return `This action removes a #${id} cloudDocument`;
  }
}
