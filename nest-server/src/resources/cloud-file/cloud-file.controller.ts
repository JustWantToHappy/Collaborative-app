import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/upload-img.config';
import { CloudFileService } from './cloud-file.service';
import { CreateCloudFileDto } from './dto/create-cloud-file.dto';
import { UpdateCloudFileDto } from './dto/update-cloud-file.dto';

@Controller('cloudFile')
export class CloudFileController {
  constructor(private readonly cloudFileService: CloudFileService) {}

  @UseInterceptors(FileInterceptor('file', multerOptions))
  @Post()
  create(
    @Body() createCloudFileDto: CreateCloudFileDto,
    @Request() request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    createCloudFileDto.path = file?.path ?? '';
    createCloudFileDto.userId = request.user.id;
    delete createCloudFileDto.file;
    return this.cloudFileService.create(createCloudFileDto);
  }

  @Get()
  findAll(@Request() request) {
    return this.cloudFileService.findAll(request.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() request) {
    return this.cloudFileService.findOne(id, request.user.id);
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
    return this.cloudFileService.remove(id);
  }
}
