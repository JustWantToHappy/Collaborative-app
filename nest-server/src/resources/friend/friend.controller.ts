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
import { FriendService } from './friend.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post()
  create(@Request() request, @Body() createFriendDto: CreateFriendDto) {
    return this.friendService.create(createFriendDto, request.user.id);
  }

  @Get()
  findAll(@Request() request) {
    return this.friendService.findAll(request.user.id);
  }

  @Get('invited')
  invitedInfo(@Request() request) {
    return this.friendService.invitedInfo(request.user.id);
  }

  @Patch()
  update(@Request() request, @Body() updateFriendDto: UpdateFriendDto) {
    return this.friendService.update(request.user.id, updateFriendDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendService.remove(id);
  }
}
