import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoItemService } from './todo_item.service';
import { CreateTodoItemDto } from './dto/create-todo_item.dto';
import { UpdateTodoItemDto } from './dto/update-todo_item.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@ApiTags('todo-item')
@Controller('todo-item')
export class TodoItemController {
  constructor(private readonly todoItemService: TodoItemService) { }

  @Post()
  create(@Body() createTodoItemDto: CreateTodoItemDto) {
    return this.todoItemService.create(createTodoItemDto);
  }

  @Get()
  findAll() {
    return this.todoItemService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.todoItemService.findOne(+id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateTodoItemDto: UpdateTodoItemDto) {
    return this.todoItemService.update(+id, updateTodoItemDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.todoItemService.remove(+id);
  }
}


