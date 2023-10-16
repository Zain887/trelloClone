import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { ListEntity } from './entities/list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from 'src/board/board.module';

@Module({
  imports: [TypeOrmModule.forFeature([ListEntity]), BoardModule],
  controllers: [ListController],
  providers: [ListService],
  exports: [TypeOrmModule, ListService]
})
export class ListModule { }
