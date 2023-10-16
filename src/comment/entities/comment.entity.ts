import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { CardEntity } from '../../card/entities/card.entity';

@Entity('comment')
export class CommentEntity {
	@PrimaryGeneratedColumn('uuid') 
	id: string;
  
  @Column({ type: 'text'}) 
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => CardEntity)
  card: CardEntity;
}
