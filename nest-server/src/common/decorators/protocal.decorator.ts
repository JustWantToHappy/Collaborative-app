import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//自定义装饰器函数
export const Protocal = createParamDecorator(
  (defaultValue: string, ctx: ExecutionContext) => {
    console.info({ defaultValue });
    const request = ctx.switchToHttp().getRequest();
    return request;
  },
);
