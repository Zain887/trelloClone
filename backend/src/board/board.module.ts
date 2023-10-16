import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from './entities/board.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { MemberEntity } from 'src/member/entities/member.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity, UserEntity, MemberEntity]), UserModule],
  controllers: [BoardController],
  providers: [BoardService],
  exports: [TypeOrmModule, BoardService]
})
export class BoardModule { }
