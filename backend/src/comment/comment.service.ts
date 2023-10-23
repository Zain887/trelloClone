import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { CardService } from 'src/card/card.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly cardService: CardService,
    private readonly userService: UserService,
  ) { }


  async create(cardId: string, userId: string, data: CreateCommentDto) {
    const card = await this.cardService.findOrThrowError(cardId);
    const user = await this.userService.findOrThrowError(userId);
    const comment = await this.commentRepository.create({
      ...data,
      card,
      user,
    });
    return await this.commentRepository.save(comment);
  }

  async findAll() {
    return await this.commentRepository.find();
  }

  async findOne(id: string) {
    return await this.commentRepository.findOne({ where: { id } });
  }
  async findOrThrowError(id: string) {
    try {
      const comment = await this.findOne(id);
      if (!comment) {
        throw new NotFoundException(`Comment with ID ${id} not found`);
      }
      return comment;
    } catch (error) {
      throw error
    }
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const existingComment = await this.findOne(id);
    this.commentRepository.merge(existingComment, updateCommentDto);
    return await this.commentRepository.save(existingComment);
  }

  async remove(id: string) {
    const existingComment = await this.findOne(id);
    return await this.commentRepository.remove(existingComment);
  }



}
