import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberEntity } from './entities/member.entity';
import { BoardService } from 'src/board/board.service';
import { UserService } from 'src/user/user.service';
import { BoardMemberEntity } from 'src/board_member/entities/board_member.entity';
import { CreateMemberDto } from './dto/create-member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly memberRepository: Repository<MemberEntity>,
    @InjectRepository(BoardMemberEntity)
    private readonly boardMemberRepository: Repository<BoardMemberEntity>,
    private readonly boardService: BoardService,
    private readonly userService: UserService,
  ) { }


  async create(createMemberDto: CreateMemberDto, userId: string) {
    try {
      const { email } = createMemberDto;

      // Check if a member with the same email already exists
      const existingMember = await this.memberRepository.findOne({ where: { email } });

      if (existingMember) {
        return { message: 'member already exists.' };
      }

      const newMember = this.memberRepository.create({ email, user: { id: userId } });
      const savedMember = await this.memberRepository.save(newMember);

      return savedMember;
    } catch (error) {
      throw error;
    }
  }


  async findAll(): Promise<MemberEntity[]> {
    return await this.memberRepository.find();
  }

  async addMemberToBoard(boardId: string, userId: string, email: string) {
    try {
      // Check if a member with the same email already exists
      await this.userService.findOrThrowError(userId);
      await this.boardService.findOrThrowError(boardId);
      const user = await this.memberRepository.findOne({ where: { email } });
      if (!user) {
        throw new Error(`Member with email ${email} does not exist.`);
      }

      // Check if the member is already a part of the board
      const boardMember = await this.boardMemberRepository.findOne({ where: { user: user, board: { id: boardId } } });

      if (boardMember) {
        throw new Error(`Member with email ${email} is already a part of this board.`);
      }

      // Create a new board member
      const newBoardMember = this.boardMemberRepository.create({ user: { id: userId }, board: { id: boardId }, email });
      await this.boardMemberRepository.save(newBoardMember);
    } catch (error) {
      throw new Error(`Error adding member to board: ${error.message}`);
    }
  }



  async getAllMembersByBoardId(boardId: string): Promise<BoardMemberEntity[]> {
    return await this.boardMemberRepository.find({
      where: { board: { id: boardId } },
    });
  }

  async delete(memberId: string): Promise<void> {
    const deleteResult = await this.memberRepository.delete(memberId);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Member with ID ${memberId} not found`);
    }
  }


  async findOne(id: string): Promise<MemberEntity | null> {
    return await this.memberRepository.findOne({ where: { id } });
  }


  async findOrThrowError(id: string) {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async removeMemberFromBoard(id: string): Promise<void> {
    await this.memberRepository.delete(id);
  }

















  async getMembersByUserId(userId: string) {
    return await this.memberRepository.find({ where: { user: { id: userId } } });
  }

  async getMemberByEmail(email: string) {
    const member = await this.memberRepository.findOne({ where: { email } });
    if (!member) {
      return null;
    }
    return member;
  }

  async updateMember(memberId: string, updateData: Partial<MemberEntity>) {
    const member = await this.memberRepository.findOne({ where: { id: memberId } });
    if (!member) {
      return null;
    }
    Object.assign(member, updateData);
    return await this.memberRepository.save(member);
  }

  async getBoardsByMemberId(memberId: string) {
    const member = await this.memberRepository.findOne({ where: { id: memberId }, relations: ['boards'] });
    if (!member) {
      return [];
    }
    return member.boards;
  }

  async removeMemberFromBoards(memberId: string) {
    const member = await this.memberRepository.findOne({ where: { id: memberId }, relations: ['boards'] });
    if (!member) {
      throw new NotFoundException(`Member with ID ${memberId} not found`);
    }
    member.boards = [];
    await this.memberRepository.save(member);
  }





  // async create(memberData: Partial<MemberEntity>): Promise<MemberEntity> {
  //   const newMember = this.memberRepository.create(memberData);
  //   return await this.memberRepository.save(newMember);
  // }

  // async update(id: string, memberData: Partial<MemberEntity>): Promise<MemberEntity | null> {
  //   const existingMember = await this.memberRepository.findOne({where: {id}});
  //   if (!existingMember) {
  //     return null;
  //   }
  //   this.memberRepository.merge(existingMember, memberData);
  //   return await this.memberRepository.save(existingMember);
  // }


}
