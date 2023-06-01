import { Dependencies, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth/auth.module';
import { UserModule } from './resources/user/user.module';
/**
 * imports:当你在一个模块的imports数组中导入一个模块时，该模块中的所有providers都被注册到了当前模块的
 * providers数组中。
 */
@Dependencies(DataSource)
@Module({
  imports: [
    /**
     * 从默认位置加载和解析.env文件(也就是从项目根目录)
     * ConfigModule还将.env文件中的键值对与分配给process.env的环境变量进行合并
     */
    ConfigModule.forRoot({
      //ignoreEnvFile: true,生产环境下可能不需要配置文件
      //全局环境配置
      load: [appConfig],
    }),
    AuthModule,
    /**
     * 这里也可以使用forRoot同步加载配置，但是在imports中导入时候要注意顺序，因为process.env是依赖ConfigModule的
     * 开启forRootAsync异步加载之后，我们的配置信息将在应用程序中的每个模块都被解析之后才被加载。
     */
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DATEBASE_HOST,
        port: +process.env.DATEBASE_PORT,
        username: process.env.DATEBASE_USER,
        password: process.env.DATEBASE_PASSWORD,
        database: process.env.DATEBASE_NAME,
        autoLoadEntities: true,
        synchronize: true, //保证TypeORM实体每次运行应用程序时都会与数据库同步
      }),
    }),
    UserModule,
    //CommonModule,
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
export class AppModule {
  constructor(private readonly dataSource: DataSource) {}
}
