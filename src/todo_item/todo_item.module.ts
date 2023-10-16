import { Module } from '@nestjs/common';
import { TodoItemService } from './todo_item.service';
import { TodoItemController } from './todo_item.controller';
import { TodoItemEntity } from './entities/todo_item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TodoItemEntity])],
  controllers: [TodoItemController],
  providers: [TodoItemService],
  exports: [TypeOrmModule]
})
export class TodoItemModule { }
