import { Module } from '@nestjs/common';
import { BoardMemberService } from './board_member.service';
import { BoardMemberController } from './board_member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardMemberEntity } from './entities/board_member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardMemberEntity])],
  controllers: [BoardMemberController],
  providers: [BoardMemberService],
  exports: [TypeOrmModule]
})
export class BoardMemberModule { }
