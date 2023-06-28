import { Controller, Delete, Get, Param, Request } from '@nestjs/common';
import { FriendService } from './friend.service';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}
  @Get()
  findUserLinkMan(@Request() request) {
    return this.friendService.findUserLinkMan(request.user.id);
  }

  @Delete(':id')
  deleteUserFriend(@Param('id') id: string, @Request() request) {
    return this.friendService.deleteUserFriend(request.user.id, id);
  }
}
