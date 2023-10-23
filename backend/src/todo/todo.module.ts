import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoEntity } from './entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardModule } from 'src/card/card.module';

@Module({

  imports: [TypeOrmModule.forFeature([TodoEntity]),CardModule],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TypeOrmModule]
})
export class TodoModule { }
