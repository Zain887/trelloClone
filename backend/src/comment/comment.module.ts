import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { CardModule } from 'src/card/card.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]), CardModule ,UserModule],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [TypeOrmModule]
})
export class CommentModule { }
