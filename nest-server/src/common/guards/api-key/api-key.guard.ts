import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

//路由守卫，指示当前请求应该被允许还是拒绝,如果被拒绝，则响应码是403
@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    //依赖其他类的全局守卫必须在module上下文中注册,我们可以将其放入到公共Module中
    private readonly configService: ConfigService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    //如果路由是公共路由，不进行拦截
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    return authHeader === this.configService.get('API_KEY');
  }
}
