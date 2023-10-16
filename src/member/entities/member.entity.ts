import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, Column } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { BoardEntity } from '../../board/entities/board.entity';

@Entity('member')
export class MemberEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 64, unique: true })
	email: string;
  
  @ManyToOne(() => UserEntity, (user) => user.members)
  user: UserEntity;

  @ManyToMany(() => BoardEntity, (board) => board.boardMembers)
  @JoinTable()
  boards: BoardEntity[];
}
