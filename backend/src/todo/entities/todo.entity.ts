// TodoEntity
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { CardEntity } from '../../card/entities/card.entity';
import { TodoItemEntity } from '../../todo_item/entities/todo_item.entity';

@Entity('todo')
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 256 })
  title: string;

  @ManyToOne(() => CardEntity, card => card.todos)
  card: CardEntity;

  @OneToMany(() => TodoItemEntity, todoItem => todoItem.todo)
  items: TodoItemEntity[];
}
