import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key/api-key.guard';
import { LoggingMiddleware } from './middleware/logging/logging.middleware';

@Module({
  imports: [ConfigModule],
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    /**
     * apply方法指定要应用的中间件，它会返回一个Nestjs中间件对象，这个中间件对象使用forRoutes
     * 方法来指定中间价要应用的路由，使用通配符表示将中间件应用到所有的路由中。
     */
    //consumer.apply(LoggingMiddleware).forRoutes('*');
    //指定特定的路由

    /*  consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: 'user/oneUser/:id', method: RequestMethod.GET });*/

    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: 'user/*', method: RequestMethod.GET });
  }
}
