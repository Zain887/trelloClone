import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardEntity } from '../board/entities/board.entity';
import { NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
    private readonly userService: UserService,
  ) { }


  async create(createBoardDto: CreateBoardDto, userId: string) {
    await this.userService.findOrThrowError(userId);
    const board = this.boardRepository.create({
      ...createBoardDto,
      user: { id: userId },
    });
    return await this.boardRepository.save(board);
  }

  async findAll() {
    return await this.boardRepository.find();
  }

  async findOne(id: string): Promise<BoardEntity> {
    return await this.boardRepository.findOne({ where: { id } });
  }

  async findOneByUuid(userId: string) {
    return await this.boardRepository.findOne({ where: { user: { id: userId } } });
    
  }

  async findOrThrowError(id: string): Promise<BoardEntity> {
    try {
      const board = await this.findOne(id);
      if (!board) {
        throw new NotFoundException(`Board with ID ${id} not found`);
      }
      return board;
    } catch (error) {
      throw error;
    }
  }


  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<BoardEntity> {
    const existingBoard = await this.findOrThrowError(id);
    this.boardRepository.merge(existingBoard, updateBoardDto);
    return await this.boardRepository.save(existingBoard);
  }

  async remove(id: string) {
    await this.findOrThrowError(id);
    return await this.boardRepository.delete(id);

  }
}
