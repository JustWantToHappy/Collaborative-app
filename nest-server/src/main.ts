import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout/timeout.interceptor';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //使用全局管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        //默认为false,如果设置为true，nestjs会根据参数的装饰器和参数类型进行类型转换，即自动将请求参数转换为相应的类型。
        enableImplicitConversion: true,
      },
    }),
  );
  //使用全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    //使用全局拦截器，对请求响应的数据进行一些处理
    new WrapResponseInterceptor(),
    //使用超时拦截器
    new TimeoutInterceptor(),
  );

  const options = new DocumentBuilder()
    .setTitle('在线文档协同平台系统接口文档')
    .setDescription('')
    .setVersion('1.0')
    .addTag('')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  //挂载swagger UI的路由路径，同时将文档对象挂载到我们的应用程序
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
