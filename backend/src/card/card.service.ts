import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardEntity } from '../card/entities/card.entity';
import { ListService } from 'src/list/list.service';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
    private readonly listService: ListService,
  ) { }

  async create(listId: string, createCardDto: CreateCardDto): Promise<CardEntity> {
    const list = await this.listService.findOrThrowError(listId)
    const card = await this.cardRepository.create({
      ...createCardDto,
      list,
    });
    return await this.cardRepository.save(card);
  }

  async update(id: string, updateCardDto: UpdateCardDto): Promise<CardEntity> {
    const existingCard = await this.findOrThrowError(id);
    this.cardRepository.merge(existingCard, updateCardDto);
    return await this.cardRepository.save(existingCard);
  }

  async findAll(): Promise<CardEntity[]> {
    return await this.cardRepository.find();
  }

  async findOrThrowError(id: string): Promise<CardEntity | null> {
    try {
      const card = await this.findOne(id);
      if (!card) {
        throw new NotFoundException(`Card with ID ${id} not found`);
      }
      return card;
    } catch (error) {
      throw error;
    }
  }


  async findOne(id: string): Promise<CardEntity | null> {
    return await this.cardRepository.findOne({ where: { id } });
  }


  async remove(id: string) {
    await this.findOrThrowError(id);
    return await this.cardRepository.delete(id);
  }
}
