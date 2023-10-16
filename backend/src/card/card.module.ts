import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from './entities/card.entity';
import { ListModule } from 'src/list/list.module';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity]), ListModule],
  controllers: [CardController],
  providers: [CardService],
  exports: [TypeOrmModule, CardService]
})
export class CardModule { }
