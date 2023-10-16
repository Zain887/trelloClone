import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { MemberEntity } from './entities/member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from 'src/board/board.module';
import { UserModule } from 'src/user/user.module';
import { BoardService } from 'src/board/board.service';
import { UserService } from 'src/user/user.service';
import { BoardMemberEntity } from 'src/board_member/entities/board_member.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MemberEntity,BoardMemberEntity]),
    BoardModule,
    UserModule,
  ],
  controllers: [MemberController],
  providers: [MemberService, BoardService, UserService],
  exports: [TypeOrmModule],
})
export class MemberModule { }
