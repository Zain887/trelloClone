import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { CardService } from 'src/card/card.service';

// TodoService
@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
    private readonly cardService: CardService,
  ) { }

  async create(createTodoDto, cardId: string): Promise<TodoEntity> {
    await this.cardService.findOrThrowError(cardId)
    const { title } = createTodoDto;
    const newTodo = this.todoRepository.create({ title, card: { id: cardId } });
    return this.todoRepository.save(newTodo);
  }


  async findAll(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }

  async findOne(id: string): Promise<TodoEntity> {
    return this.todoRepository.findOne({ where: { id } });
  }

  async update(id: string, title: string): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    todo.title = title;
    return this.todoRepository.save(todo);
  }

  async findAllByCardId(cardId: string): Promise<TodoEntity[]> {
    return this.todoRepository.find({ where: { card: { id: cardId } } });
  }

  async remove(id: string): Promise<void> {
    const deleteResult = await this.todoRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`todo with ID ${id} not found`);
    }
  }
}
