import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, UsersRepository])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
