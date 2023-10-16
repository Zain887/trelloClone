import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { CardEntity } from '../../card/entities/card.entity';

@Entity('card_member')
export class CardMemberEntity {
	@PrimaryGeneratedColumn('uuid') 
	id: string;
  
  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => CardEntity)
  card: CardEntity;
}
