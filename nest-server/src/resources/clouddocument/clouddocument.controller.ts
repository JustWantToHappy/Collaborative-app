import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClouddocumentService } from './clouddocument.service';
import { CreateClouddocumentDto } from './dto/create-clouddocument.dto';
import { UpdateClouddocumentDto } from './dto/update-clouddocument.dto';

@Controller('clouddocument')
export class ClouddocumentController {
  constructor(private readonly clouddocumentService: ClouddocumentService) {}

  @Post()
  create(@Body() createClouddocumentDto: CreateClouddocumentDto) {
    return this.clouddocumentService.create(createClouddocumentDto);
  }

  @Get()
  findAll() {
    return this.clouddocumentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clouddocumentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClouddocumentDto: UpdateClouddocumentDto) {
    return this.clouddocumentService.update(+id, updateClouddocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clouddocumentService.remove(+id);
  }
}
