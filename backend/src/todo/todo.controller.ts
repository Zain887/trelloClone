import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }


  @Get('card/:cardId')
  findAllByCardId(@Param('cardId') cardId: string) {
    return this.todoService.findAllByCardId(cardId);
  }

  @Post(':cardId')
  create(@Body() createTodoDto: CreateTodoDto, @Param('cardId') cardId: string) {
    return this.todoService.create(createTodoDto, cardId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('title') title: string) {
    return this.todoService.update(id, title);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
     this.todoService.remove(id);
    return { message: 'todo deleted successfully' };
  }
  
}
