import { Entity, PrimaryGeneratedColumn, ManyToOne ,Column} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { BoardEntity } from '../../board/entities/board.entity';

@Entity('board_member')
export class BoardMemberEntity {
  @PrimaryGeneratedColumn('uuid') 
	id: string;
  
  @Column({ type: 'varchar', length: 64, unique: true })
	email: string;

  @ManyToOne(() => UserEntity, (user) => user.boardMembers)
  user: UserEntity;

  @ManyToOne(() => BoardEntity, (board) => board.members)
  board: BoardEntity;
}
