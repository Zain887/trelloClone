import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CardEntity } from '../../card/entities/card.entity';

@Entity('todo_item')
export class TodoItemEntity {
	@PrimaryGeneratedColumn('uuid') 
	id: string;
    
  @Column({ type: 'varchar', length: 256 }) 
  text: string;

  @ManyToOne(() => CardEntity, (card) => card.todoItems)
  card: CardEntity;
}
