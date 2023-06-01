import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const timeoutDuration = 3000;
    return next.handle().pipe(
      timeout(timeoutDuration),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          throw new RequestTimeoutException(
            `API request timeout of ${timeoutDuration}ms exceeded`,
          );
        }
        throw err;
      }),
    );
  }
}
