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
    //payload中username和sub字段必须是用户名和Id
    const payload = {
      username: user.email,
      sub: user.id,
      roles: user.roles,
    };
    return {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      jwt_token: await this.jwtService.signAsync(payload, {
        secret: process.env.SECRET_KEY,
        algorithm: 'HS256', // 加密算法
        expiresIn: 7 * 24 * 60 * 60, //token过期时间一个星期
      }),
    };
  }
}
