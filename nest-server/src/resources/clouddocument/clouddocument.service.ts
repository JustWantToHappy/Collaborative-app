import { Injectable } from '@nestjs/common';
import { CreateClouddocumentDto } from './dto/create-clouddocument.dto';
import { UpdateClouddocumentDto } from './dto/update-clouddocument.dto';

@Injectable()
export class ClouddocumentService {
  create(createClouddocumentDto: CreateClouddocumentDto) {
    return 'This action adds a new clouddocument';
  }

  findAll() {
    return `This action returns all clouddocument`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clouddocument`;
  }

  update(id: number, updateClouddocumentDto: UpdateClouddocumentDto) {
    return `This action updates a #${id} clouddocument`;
  }

  remove(id: number) {
    return `This action removes a #${id} clouddocument`;
  }
}
