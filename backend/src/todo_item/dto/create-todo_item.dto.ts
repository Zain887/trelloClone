import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { TodoItemStatus } from '../entities/todo_item.entity'; // Replace with the actual path

export class CreateTodoItemDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsEnum(TodoItemStatus)
  status: TodoItemStatus;
}
