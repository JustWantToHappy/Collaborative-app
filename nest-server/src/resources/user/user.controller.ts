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
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from 'src/auth/auth/auth.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { request } from 'http';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (Object.prototype.toString.call(id) !== '[Object Number]') {
      throw new BadRequestException(`params ${id} is not a number`);
    }
    return this.userService.findOne(+id);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.userService.findAll(paginationQuery);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Public()
  @Post('login')
  login(@Body() body: any) {
    return this.authService.signIn(body.email, body.password);
  }

  @Post('invite')
  invite(@Body() body: any, @Request() request) {
    const user = request.user;
    return this.userService.invite(body.email, user.id);
  }

  @Post('loginafter')
  loginAfter(@Request() request, @Body() body: any) {
    //我想要在这里获取到token解析之后的用户的信息
    console.info(body, 'body');
    console.info(request.user);
    return 'hhh';
  }
}
