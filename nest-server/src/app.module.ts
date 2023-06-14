import { join } from 'path';
import { APP_PIPE } from '@nestjs/core';
import appConfig from './config/app.config';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth/auth.module';
import { CommonModule } from './common/common.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Module, ValidationPipe } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './resources/user/user.module';
import { FriendModule } from './resources/friend/friend.module';
import { FriendModule } from './resources/friend/friend.module';
/**
 * imports:当你在一个模块的imports数组中导入一个模块时，该模块中的所有providers都被注册到了当前模块的
 * providers数组中。
 */
@Module({
  imports: [
    CommonModule,
    /**
     * 从默认位置加载和解析.env文件(也就是从项目根目录)
     * ConfigModule还将.env文件中的键值对与分配给process.env的环境变量进行合并
     */
    ConfigModule.forRoot({
      //全局环境配置
      load: [appConfig],
    }),
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/images'),
      serveRoot: '/public/images', //提供静态文件的子路由
    }),
    PrismaModule,
    UserModule,
    FriendModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
