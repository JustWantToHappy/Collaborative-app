import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Body() body) {
    return this.authService.signIn(body.username, body.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('auth/sb')
  test() {
    return 'bdsfds';
  }
}
