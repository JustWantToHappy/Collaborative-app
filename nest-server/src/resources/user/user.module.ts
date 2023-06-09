import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from 'src/auth/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Contact } from '../contact/entities/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Contact]), ConfigModule],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService],
  /**
   * 如果其他模块也想要对user实体对应的TypeOrm仓库做持久化操作，则可以在这里导出
   * 否则其他模块需要手动在imports中导入User仓库
   */
  exports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
