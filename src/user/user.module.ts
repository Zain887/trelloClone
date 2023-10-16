import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { MemberEntity } from 'src/member/entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, MemberEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule, UserService]
})
export class UserModule { }
