import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserTeamService } from './user-team.service';
import { CreateUserTeamDto } from './dto/create-user-team.dto';
import { UpdateUserTeamDto } from './dto/update-user-team.dto';

@Controller('user-team')
export class UserTeamController {
  constructor(private readonly userTeamService: UserTeamService) {}

  @Post()
  create(@Body() createUserTeamDto: CreateUserTeamDto) {
    return this.userTeamService.create(createUserTeamDto);
  }

  @Get()
  findAll() {
    return this.userTeamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTeamService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserTeamDto: UpdateUserTeamDto,
  ) {
    return this.userTeamService.update(+id, updateUserTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTeamService.remove(+id);
  }
}
