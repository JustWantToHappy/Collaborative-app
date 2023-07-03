import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CloudDocumentService } from './cloud-document.service';
import { CreateCloudDocumentDto } from './dto/create-cloud-document.dto';
import { UpdateCloudDocumentDto } from './dto/update-cloud-document.dto';

@Controller('cloud-document')
export class CloudDocumentController {
  constructor(private readonly cloudDocumentService: CloudDocumentService) {}

  @Post()
  create(@Body() createCloudDocumentDto: CreateCloudDocumentDto) {
    return this.cloudDocumentService.create(createCloudDocumentDto);
  }

  @Get()
  findAll() {
    return this.cloudDocumentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cloudDocumentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCloudDocumentDto: UpdateCloudDocumentDto) {
    return this.cloudDocumentService.update(+id, updateCloudDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cloudDocumentService.remove(+id);
  }
}
