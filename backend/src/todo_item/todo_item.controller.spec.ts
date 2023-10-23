import { Test, TestingModule } from '@nestjs/testing';
import { TodoItemController } from './todo_item.controller';
import { TodoItemService } from './todo_item.service';

describe('TodoItemController', () => {
  let controller: TodoItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoItemController],
      providers: [TodoItemService],
    }).compile();

    controller = module.get<TodoItemController>(TodoItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
