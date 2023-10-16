import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { ListEntity } from '../../list/entities/list.entity';
import { CardMemberEntity } from '../../card_member/entities/card_member.entity'
import { CommentEntity } from '../../comment/entities/comment.entity';
import { TodoItemEntity } from '../../todo_item/entities/todo_item.entity';
@Entity('card')
export class CardEntity {
  @PrimaryGeneratedColumn('uuid') 
	id: string;
  
  @Column({ type: 'varchar', length: 64 })
  title: string;

  @Column({ type: 'text', nullable: true}) 
  description: string;

  @Column({ type: 'boolean', default: true }) 
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true }) 
  dueDate: Date ;

  @Column({ type: 'timestamp', nullable: true }) 
  reminderDate: Date ;

  @ManyToOne(() => ListEntity, (list) => list.cards)
  @JoinColumn({ name: 'listId' })
  list: ListEntity;

  @OneToMany(() => CardMemberEntity, (cardMember) => cardMember.card)
  cardMembers: CardMemberEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.card)
  comments: CommentEntity[];

  @OneToMany(() => TodoItemEntity, (todoItem) => todoItem.card)
  todoItems: TodoItemEntity[];
}
