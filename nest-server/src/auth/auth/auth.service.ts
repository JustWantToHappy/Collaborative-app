import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/resources/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username, password) {
    const user = await this.userService.findOne(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.SECRET_KEY,
        expiresIn: '1800s',
      }),
    };
  }
}
