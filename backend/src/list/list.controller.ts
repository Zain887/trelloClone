import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiBody, ApiBadRequestResponse, ApiNotFoundResponse, ApiBearerAuth } from '@nestjs/swagger'; // Import necessary Swagger decorators

@ApiBearerAuth('JWT-auth')
@Controller('list')
@ApiTags('list') 
export class ListController {
  constructor(private readonly listService: ListService) { }

  @ApiOperation({ summary: 'Get all lists' }) 
  @ApiResponse({ status: 200, description: 'All lists retrieved successfully' }) 
  @Get()
  findAll() {
    return this.listService.findAll();
  }

  @ApiOperation({ summary: 'Get all lists by Board ID' })
  @ApiResponse({ status: 200, description: 'All lists retrieved successfully' })
  @ApiParam({ name: 'boardId', type: 'string' })
  @Get('/board/:boardId')
  findAllByBoardId(@Param('boardId', ParseUUIDPipe) boardId: string) {
    return this.listService.findAllByBoardId(boardId);
  }
  


  @ApiOperation({ summary: 'Create a new list' }) 
  @ApiParam({ name: 'id', type: 'string' }) 
  @ApiBody({ type: CreateListDto }) 
  @ApiResponse({ status: 201, description: 'List created successfully' }) 
  @ApiBadRequestResponse({ description: 'Bad request' }) 
  @Post('/:boardId')
  create(@Param('boardId', ParseUUIDPipe) boardId: string, @Body() createListDto: CreateListDto) {
    return this.listService.create(boardId, createListDto);
  }

  @ApiOperation({ summary: 'Get a list by ID' }) 
  @ApiParam({ name: 'id', type: 'string' }) 
  @ApiResponse({ status: 200, description: 'List retrieved successfully' }) 
  @ApiNotFoundResponse({ description: 'List not found' }) 
  @Get('/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.listService.findOrThrowError(id);
  }

  @ApiOperation({ summary: 'Update a list by ID' }) 
  @ApiParam({ name: 'id', type: 'string' }) 
  @ApiBody({ type: UpdateListDto }) 
  @ApiResponse({ status: 200, description: 'List updated successfully' }) 
  @ApiNotFoundResponse({ description: 'List not found' }) 
  @Patch('/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(id, updateListDto);
  }

  @ApiOperation({ summary: 'Delete a list by ID' }) 
  @ApiParam({ name: 'id', type: 'string' }) 
  @ApiResponse({ status: 200, description: 'List deleted successfully' }) 
  @ApiNotFoundResponse({ description: 'List not found' }) 
  @Delete('/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.listService.remove(id);
  }

  
}
