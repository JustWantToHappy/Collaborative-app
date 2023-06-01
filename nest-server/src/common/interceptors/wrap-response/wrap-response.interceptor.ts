import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

//所有拦截器都应该实现NestInterceptor这个接口
@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.info('Before...');
    //tap操作符并不会对请求和响应造成任何影响
    //return next.handle().pipe(tap((data) => console.info('After', data)));
    return next.handle().pipe(map((data) => ({ data })));
  }
}
