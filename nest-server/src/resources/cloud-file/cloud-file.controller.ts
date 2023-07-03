import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { CloudFileService } from './cloud-file.service';
import { CreateCloudFileDto } from './dto/create-cloud-file.dto';
import { UpdateCloudFileDto } from './dto/update-cloud-file.dto';

@Controller('cloudFile')
export class CloudFileController {
  constructor(private readonly cloudFileService: CloudFileService) {}

  @Post()
  create(@Body() createCloudFileDto: CreateCloudFileDto, @Request() request) {
    createCloudFileDto.userId = request.user.id;
    return this.cloudFileService.create(createCloudFileDto);
  }

  @Get()
  findAll(@Request() request) {
    return this.cloudFileService.findAll(request.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cloudFileService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCloudFileDto: UpdateCloudFileDto,
  ) {
    return this.cloudFileService.update(id, updateCloudFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cloudFileService.remove(+id);
  }
}
