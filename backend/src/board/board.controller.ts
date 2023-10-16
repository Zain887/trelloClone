import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ParseUUIDPipe } from '@nestjs/common/pipes'
import { User } from 'src/user/user.decorator';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiBody, ApiBadRequestResponse, ApiNotFoundResponse, ApiBearerAuth } from '@nestjs/swagger'; 

@ApiBearerAuth('JWT-auth')
@Controller('/board')
@ApiTags('board') 
export class BoardController {
  constructor(private readonly boardService: BoardService) { }

  @ApiOperation({ summary: 'Create a new board' }) 
  @ApiBody({ type: CreateBoardDto }) 
  @ApiResponse({ status: 201, description: 'Board created successfully' })  
  @ApiBadRequestResponse({ description: 'Bad request' }) 
  @Post()
  create(@Body() createBoardDto: CreateBoardDto, @User('userId') userId: string) {
    return this.boardService.create(createBoardDto, userId);
  }

  @ApiOperation({ summary: 'Get all boards' }) 
  @ApiResponse({ status: 200, description: 'All boards retrieved successfully' }) 
  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @ApiOperation({ summary: 'Get a board by ID' }) 
  @ApiParam({ name: 'id', type: 'string' }) 
  @ApiNotFoundResponse({ description: 'Board not found' }) 
  @Get('/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.boardService.findOrThrowError(id);
  }

  @ApiOperation({ summary: 'Update a board by ID' }) 
  @ApiParam({ name: 'id', type: 'string' }) 
  @ApiBody({ type: UpdateBoardDto }) 
  @ApiResponse({ status: 200, description: 'Board updated successfully' }) 
  @ApiNotFoundResponse({ description: 'Board not found' }) 
  @Patch('/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(id, updateBoardDto);
  }

  @ApiOperation({ summary: 'Delete a board by ID' }) 
  @ApiParam({ name: 'id', type: 'string' }) 
  @ApiResponse({ status: 200, description: 'Board deleted successfully' }) 
  @ApiNotFoundResponse({ description: 'Board not found' }) 
  @Delete('/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.boardService.remove(id);
  }
}
