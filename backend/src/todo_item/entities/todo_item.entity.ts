// TodoItemEntity
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TodoEntity } from '../../todo/entities/todo.entity';
import { CardEntity } from '../../card/entities/card.entity';

export enum TodoItemStatus {
  TODO = 'todo',
  IN_PROCESS = 'in_process',
  DONE = 'done',
}

@Entity('todo_item')
export class TodoItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 256 })
  text: string;

  @Column({
    type: 'enum',
    enum: TodoItemStatus,
    default: TodoItemStatus.TODO,
  })
  status: TodoItemStatus;


  @ManyToOne(() => TodoEntity, todo => todo.items)
  todo: TodoEntity;

  @ManyToOne(() => CardEntity, card => card.todoItems)
  card: CardEntity;
}
