import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SharedCloudFileService } from './shared-cloud-file.service';
import { CreateSharedCloudFileDto } from './dto/create-shared-cloud-file.dto';
import { UpdateSharedCloudFileDto } from './dto/update-shared-cloud-file.dto';

@Controller('shared-cloud-file')
export class SharedCloudFileController {
  constructor(
    private readonly sharedCloudFileService: SharedCloudFileService,
  ) {}

  @Post()
  create(@Body() createSharedCloudFileDto: CreateSharedCloudFileDto) {
    return this.sharedCloudFileService.create(createSharedCloudFileDto);
  }

  @Get()
  findAll() {
    return this.sharedCloudFileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sharedCloudFileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSharedCloudFileDto: UpdateSharedCloudFileDto,
  ) {
    return this.sharedCloudFileService.update(+id, updateSharedCloudFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sharedCloudFileService.remove(+id);
  }
}
