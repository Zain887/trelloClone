import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoItemService } from './todo_item.service';
import { CreateTodoItemDto } from './dto/create-todo_item.dto';
import { UpdateTodoItemDto } from './dto/update-todo_item.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@ApiTags('todo-item')
@Controller('todo-items')
export class TodoItemController {
  constructor(private readonly todoItemService: TodoItemService) {}

  @Get()
  findAll() {
    return this.todoItemService.findAll();
  }
  
  @Get('todo/:todoId')
  findAllByTodoId(@Param('todoId') todoId: string) {
    return this.todoItemService.findAllByTodoId(todoId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoItemService.findOne(id);
  }
  
  @Post(':cardId/:todoId')
  create(@Body() createTodoItemDto: CreateTodoItemDto, @Param('cardId') cardId: string, @Param('todoId') todoId: string) {
    return this.todoItemService.create(createTodoItemDto, cardId, todoId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoItemDto: UpdateTodoItemDto) {
    return this.todoItemService.update(id, updateTodoItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoItemService.remove(id);
  }
}
