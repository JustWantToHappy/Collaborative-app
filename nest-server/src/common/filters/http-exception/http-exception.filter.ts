import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
//所有的ExceptionFilter都应该实现ExceptionFilter接口
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error =
      typeof response === 'string'
        ? { msg: exceptionResponse }
        : (exceptionResponse as any);
    const { message } = error;

    const errorMessage = Array.isArray(message) ? message[0] : message;

    response.status(status).json({
      statusCode: status,
      msg: errorMessage,
      time: new Date().toISOString(),
    });
  }
}
