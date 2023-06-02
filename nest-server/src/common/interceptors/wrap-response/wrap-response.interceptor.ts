import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//所有拦截器都应该实现NestInterceptor这个接口，NestInterceptor自动返回JSON格式数据
@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        data,
        statusCode: HttpStatus.OK,
        time: new Date().toISOString(),
      })),
    );
  }
}
