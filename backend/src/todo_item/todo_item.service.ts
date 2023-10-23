import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoItemDto } from './dto/create-todo_item.dto';
import { UpdateTodoItemDto } from './dto/update-todo_item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoItemEntity } from './entities/todo_item.entity';
// TodoItemService
@Injectable()
export class TodoItemService {
  constructor(
    @InjectRepository(TodoItemEntity)
    private readonly todoItemRepository: Repository<TodoItemEntity>,
  ) { }

  async findAllByTodoId(todoId: string): Promise<TodoItemEntity[]> {
    return this.todoItemRepository.find({ where: { todo: { id: todoId } } });
  }

  async create(createTodoItemDto: CreateTodoItemDto, cardId: string, todoId: string): Promise<TodoItemEntity> {
    const { text, status } = createTodoItemDto;
    const newTodoItem = this.todoItemRepository.create({ text ,status, card: { id: cardId }, todo: { id: todoId } });
    return this.todoItemRepository.save(newTodoItem);
}


  async findAll(): Promise<TodoItemEntity[]> {
    return this.todoItemRepository.find();
  }

  async findOne(id: string): Promise<TodoItemEntity> {
    return this.todoItemRepository.findOne({ where: { id } });
  }

  async update(id: string, updateTodoItemDto: UpdateTodoItemDto): Promise<TodoItemEntity> {
    const todoItem = await this.todoItemRepository.findOne({ where: { id } });
    const { text, status } = updateTodoItemDto;
    if (!todoItem) {
      throw new NotFoundException(`Todo item with ID ${id} not found`);
    }
    todoItem.text = text;
    todoItem.status = status;
    
    return this.todoItemRepository.save(todoItem);
  }

  async remove(id: string): Promise<void> {
    await this.todoItemRepository.delete(id);
  }
}
