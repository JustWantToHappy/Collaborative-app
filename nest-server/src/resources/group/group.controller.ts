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
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/upload-img.config';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @UseInterceptors(FileInterceptor('file', multerOptions))
  @Post()
  create(
    @Request() request,
    @UploadedFile() file: Express.Multer.File,
    @Body() createGroupDto: CreateGroupDto,
  ) {
    createGroupDto.leaderId = request.user.id;
    createGroupDto.avatar = file.path;
    return this.groupService.create(createGroupDto);
  }

  @Get()
  findUserLeadGroups(@Request() request) {
    return this.groupService.findUserLeadGroups(request.user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }

  @Post('apply')
  applyJoin(@Request() request, @Body() body: { name: string }) {
    return this.groupService.applyJoin(request.user.id, body.name);
  }
}
