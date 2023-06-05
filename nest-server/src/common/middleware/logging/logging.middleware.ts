import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.info('logging middleware');
    /**
     * 请求完成的时候调用，可以用来统计请求的响应时间
     * 注意：这里的响应时间指的是从服务器发出 HTTP 响应到该响应到达客户端的总时间
     */
    //console.time('Request-reponse time)的计时器标签，并开始计时
    console.time('Request-response time');
    res.on('finish', () => console.timeEnd('Request-response time'));
    next();
  }
}
