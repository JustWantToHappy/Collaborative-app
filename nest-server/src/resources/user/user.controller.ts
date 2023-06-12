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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from 'src/auth/auth/auth.service';
import { FileInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { multerOptions } from 'src/config/upload-img.config';

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

  @Patch('')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  update(
    @UploadedFile() file: Express.Multer.File,
    @Request() request,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    updateUserDto.avatar = file.path;
    return this.userService.update(request.user.id, updateUserDto);
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
}
