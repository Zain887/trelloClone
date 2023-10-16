import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	OneToMany,
	ManyToMany,
	ManyToOne,
  } from 'typeorm';
  import { UserEntity } from '../../user/entities/user.entity';
  import { ListEntity } from '../../list/entities/list.entity';
  import { MemberEntity } from '../../member/entities/member.entity';
   
  @Entity('board')
  export class BoardEntity {
	@PrimaryGeneratedColumn('uuid') 
	id: string;
  
	@Column({ type: 'varchar', length: 64 }) 
	title: string;
  
	@Column({ type: 'boolean', default: true })
	isActive: boolean;
  
	@CreateDateColumn()
	createdAt: Date;
  
	@OneToMany(() => ListEntity, (list) => list.board)
	lists: ListEntity[];
  
	@ManyToMany(() => UserEntity, (user) => user.boards)
	members: UserEntity[];
  
	@ManyToOne(() => UserEntity, (user) => user.boards)
	user: UserEntity;
  
	@ManyToMany(() => MemberEntity, (member) => member.boards)
	boardMembers: MemberEntity[];
  }
  