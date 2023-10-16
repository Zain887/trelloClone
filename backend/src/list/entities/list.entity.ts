import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { BoardEntity } from '../../board/entities/board.entity';
import { CardEntity } from '../../card/entities/card.entity';

export enum ListPosition {
  FIRST = 'toDo',
  SECOND = 'doing',
  THIRD = 'done',
}

@Entity('list')
export class ListEntity {
  @PrimaryGeneratedColumn('uuid') 
  id: string;
  
  @Column({ type: 'varchar', length: 32 })
  title: string;

  @Column({ type: 'enum', enum: ListPosition })
  position: ListPosition;

  @ManyToOne(() => BoardEntity, (board) => board.lists)
  board: BoardEntity;

  @OneToMany(() => CardEntity, (card) => card.list)
  cards: CardEntity[];
}
