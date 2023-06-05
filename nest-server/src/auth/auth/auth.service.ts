import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/resources/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.findOnyByEmail(email);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = {
      username: user.email,
      sub: user.id,
      roles: user.roles,
    };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.SECRET_KEY,
        algorithm: 'HS256', // 加密算法
        expiresIn: '1800s',
      }),
    };
  }
}
