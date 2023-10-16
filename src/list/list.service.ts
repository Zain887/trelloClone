import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListEntity } from '../list/entities/list.entity';
import { CreateListDto } from '../list/dto/create-list.dto';
import { UpdateListDto } from '../list/dto/update-list.dto'; import { BoardService } from 'src/board/board.service';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(ListEntity)
    private readonly listRepository: Repository<ListEntity>,
    private readonly boardService: BoardService,
  ) { }


  async create(boardId: string, createListDto: CreateListDto): Promise<ListEntity> {
    const board = await this.boardService.findOrThrowError(boardId);
    const list = await this.listRepository.create({
      ...createListDto,
      board,
    });
    return await this.listRepository.save(list);
  }


  async findAll(): Promise<ListEntity[]> {
    return await this.listRepository.find();
  }

  async findOne(id: string): Promise<ListEntity | null> {
    return await this.listRepository.findOne({ where: { id } });
  }


  async findOrThrowError(id: string): Promise<ListEntity | null> {
    try {
      const list = await this.findOne(id);

      if (!list) {
        throw new NotFoundException(`List with ID ${id} not found`);
      }

      return list;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateListDto: UpdateListDto): Promise<ListEntity> {
    const existingList = await this.findOrThrowError(id);
    this.listRepository.merge(existingList, updateListDto);
    return await this.listRepository.save(existingList);

  }

  async remove(id: string) {
    await this.findOrThrowError(id);
    return await this.listRepository.delete(id);

  }

}
