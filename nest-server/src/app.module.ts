import { join } from 'path';
import { DataSource } from 'typeorm';
import { APP_PIPE } from '@nestjs/core';
import appConfig from './config/app.config';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth/auth.module';
import { CommonModule } from './common/common.module';
import { FileModule } from './resources/file/file.module';
import { UserModule } from './resources/user/user.module';
import { TeamModule } from './resources/team/team.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SharedModule } from './resources/shared/shared.module';
import { ContactModule } from './resources/contact/contact.module';
import { Dependencies, Module, ValidationPipe } from '@nestjs/common';
import { UserTeamModule } from './resources/user-team/user-team.module';
import { KnowledgeBaseModule } from './resources/knowledge-base/knowledge-base.module';
import { ConversationModule } from './resources/conversation/conversation.module';
import { MessageModule } from './resources/message/message.module';
import { ImageModule } from './resources/image/image.module';
/**
 * imports:当你在一个模块的imports数组中导入一个模块时，该模块中的所有providers都被注册到了当前模块的
 * providers数组中。
 */
@Dependencies(DataSource)
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
        //保证TypeORM实体每次运行应用程序时都会与数据库同步(开启为true，生产环境下必须设置为false)
        synchronize: true,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/images'),
      serveRoot: '/public/images', //提供静态文件的子路由
    }),
    UserModule,
    TeamModule,
    UserTeamModule,
    ContactModule,
    FileModule,
    SharedModule,
    KnowledgeBaseModule,
    ConversationModule,
    MessageModule,
    ImageModule,
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
