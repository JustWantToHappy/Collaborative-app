import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/resources/user/user.service';

@Module({
  imports: [
    PassportModule,
    JwtModule,
    //不知道为什么下面这种方式无法注册JWT应用。
    //JwtModule.register({
    //  secret: process.env.SECRET_KEY,
    //  signOptions: { expiresIn: '60s' },
    //}),
  ],
  providers: [
    UserService,
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
