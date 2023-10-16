import { Module } from '@nestjs/common';
import { CardMemberService } from './card_member.service';
import { CardMemberController } from './card_member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardMemberEntity } from './entities/card_member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CardMemberEntity])],
  controllers: [CardMemberController],
  providers: [CardMemberService],
  exports: [TypeOrmModule]
})
export class CardMemberModule { }
