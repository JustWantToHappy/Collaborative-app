import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
} from '@nestjs/common';
import { ApprovalService } from './approval.service';
import { CreateApprovalDto } from './dto/create-approval.dto';
import { UpdateApprovalDto } from './dto/update-approval.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Controller('approval')
export class ApprovalController {
  constructor(private readonly approvalService: ApprovalService) {}

  @Post()
  create(@Body() createApprovalDto: CreateApprovalDto, @Request() request) {
    createApprovalDto.userId = request.user.id;
    const { startTime, endTime } = createApprovalDto;
    const body = Object.assign(createApprovalDto, {
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    });
    return this.approvalService.create(body);
  }

  @Get()
  findAll(@Query() pageQuery: PaginationQueryDto, @Request() request) {
    return this.approvalService.findAll(pageQuery, request.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.approvalService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApprovalDto: UpdateApprovalDto
  ) {
    return this.approvalService.update(+id, updateApprovalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.approvalService.remove(+id);
  }
}
