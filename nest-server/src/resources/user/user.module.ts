import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from 'src/auth/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Contact } from '../contact/entities/contact.entity';
import { ContactModule } from '../contact/contact.module';
import { ContactService } from '../contact/contact.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Contact]),
    ConfigModule,
    ContactModule,
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService, ContactService],
  exports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
