import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	ManyToMany,
} from 'typeorm';
import { BoardEntity } from '../../board/entities/board.entity';
import { BoardMemberEntity } from '../../board_member/entities/board_member.entity';
import { MemberEntity } from '../../member/entities/member.entity';


@Entity('user')
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar', length: 32 })
	firstName: string;

	@Column({ type: 'varchar', length: 32 })
	lastName: string;

	@Column({ type: 'varchar', length: 64, unique: true })
	email: string;

	@Column({ type: 'varchar', length: 256 })
	password: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToMany(() => BoardEntity, (board) => board.members)
	boards: BoardEntity[];

	@OneToMany(() => BoardMemberEntity, (boardMember) => boardMember.user)
	boardMembers: BoardMemberEntity[];

	@OneToMany(() => BoardEntity, (board) => board.user)
	userBoards: BoardEntity[];

	@ManyToMany(() => MemberEntity, (member) => member.user)
	members: MemberEntity[];
}
