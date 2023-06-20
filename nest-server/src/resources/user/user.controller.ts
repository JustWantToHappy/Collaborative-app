import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth/auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/upload-img.config';
import { deleteFile } from 'src/common/utils';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  //@Roles(Role.Admin)
  findAll() {
    return this.userService.findAll();
  }

  @Patch()
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
  login(@Body() body: LoginUserDto) {
    return this.authService.signIn(body.email, body.password);
  }
}
