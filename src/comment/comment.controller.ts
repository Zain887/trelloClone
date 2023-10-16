import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from 'src/user/user.decorator';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiBody, ApiBadRequestResponse, ApiNotFoundResponse, ApiBearerAuth } from '@nestjs/swagger'; 

@ApiBearerAuth('JWT-auth')
@Controller('comment')
@ApiTags('comment') 
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @ApiOperation({ summary: 'Create a new comment' }) 
  @ApiParam({ name: 'id', type: 'string' }) 
  @ApiBody({ type: CreateCommentDto }) 
  @ApiResponse({ status: 201, description: 'Comment created successfully' }) 
  @ApiBadRequestResponse({ description: 'Bad request' }) 
  @Post('card/:id')
  create(
    @Param('id') cardId: string, @User('userId') userId: string, @Body() data: CreateCommentDto,
  ) {
    return this.commentService.create(cardId, userId, data);
  }

  @ApiOperation({ summary: 'Get all comments' }) 
  @ApiResponse({ status: 200, description: 'All comments retrieved successfully' }) 
  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @ApiOperation({ summary: 'Get a comment by ID' }) 
  @ApiParam({ name: 'id', type: 'string' }) 
  @ApiResponse({ status: 200, description: 'Comment retrieved successfully' }) 
  @ApiNotFoundResponse({ description: 'Comment not found' }) 
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOrThrowError(id);
  }

  @ApiOperation({ summary: 'Update a comment by ID' }) 
  @ApiParam({ name: 'id', type: 'string' }) 
  @ApiBody({ type: UpdateCommentDto }) 
  @ApiResponse({ status: 200, description: 'Comment updated successfully' }) 
  @ApiNotFoundResponse({ description: 'Comment not found' }) 
  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @ApiOperation({ summary: 'Delete a comment by ID' }) 
  @ApiParam({ name: 'id', type: 'string' }) 
  @ApiResponse({ status: 200, description: 'Comment deleted successfully' }) 
  @ApiNotFoundResponse({ description: 'Comment not found' }) 
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }

  
}
