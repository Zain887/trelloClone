import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CardEntity } from '../../card/entities/card.entity';

@Entity('todo')
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid') 
	id: string;
  
  @Column({ type: 'varchar', length: 64 }) 
  text: string;

  @ManyToOne(() => CardEntity)
  card: CardEntity;
}
