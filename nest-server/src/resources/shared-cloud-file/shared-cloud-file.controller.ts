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
import { SharedCloudFileService } from './shared-cloud-file.service';
import { CreateSharedCloudFileDto } from './dto/create-shared-cloud-file.dto';
import { UpdateSharedCloudFileDto } from './dto/update-shared-cloud-file.dto';
import { MoveToSharedCloudFileDto } from './dto/moveTo-shared-cloud-file.dto';
import { request } from 'http';

@Controller('sharedCloudFile')
export class SharedCloudFileController {
  constructor(
    private readonly sharedCloudFileService: SharedCloudFileService,
  ) {}

  @Post()
  create(
    @Request() requeset,
    @Body() createSharedCloudFileDto: CreateSharedCloudFileDto,
  ) {
    return this.sharedCloudFileService.create(createSharedCloudFileDto);
  }

  @Post('move')
  moveToSharedCloudFile(
    @Request() request,
    @Body() moveToSharedCloudFileDto: MoveToSharedCloudFileDto,
  ) {
    return this.sharedCloudFileService.moveToSharedCloudFile(
      request.user.id,
      moveToSharedCloudFileDto,
    );
  }

  @Get()
  findAll(@Request() request) {
    return this.sharedCloudFileService.findAll(request.user.id);
  }

  @Get(':id')
  findFolderAndFirstLevelFiles(@Param('id') id: string, @Request() request) {
    return this.sharedCloudFileService.findFolderAndFirstLevelFiles(
      id,
      request.user.id,
    );
  }

  @Get('collaborators/:id')
  findAllCollaboratorsById(@Param('id') id: string) {
    return this.sharedCloudFileService.findAllCollaboratorsById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSharedCloudFileDto: UpdateSharedCloudFileDto,
  ) {
    return this.sharedCloudFileService.update(id, updateSharedCloudFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() request) {
    return this.sharedCloudFileService.remove(id, request.user.id);
  }
}
