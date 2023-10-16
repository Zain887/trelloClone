import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiBody, ApiBadRequestResponse, ApiNotFoundResponse, ApiBearerAuth } from '@nestjs/swagger'; 

@ApiBearerAuth('JWT-auth')
@Controller('card')
@ApiTags('card') 
export class CardController {
  constructor(private readonly cardService: CardService) { }

  @ApiOperation({ summary: 'Get all cards' }) 
  @ApiResponse({ status: 200, description: 'All cards retrieved successfully' }) 
  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  @ApiOperation({ summary: 'Create a new card' }) 
  @ApiParam({ name: 'id', type: 'string' }) 
  @ApiBody({ type: CreateCardDto }) 
  @ApiResponse({ status: 201, description: 'Card created successfully' }) 
  @ApiBadRequestResponse({ description: 'Bad request' }) 
  @Post('list/:id')
  async create(
    @Param('id', ParseUUIDPipe) listId: string,
    @Body() createCardDto: CreateCardDto
  ) {
    return this.cardService.create(listId, createCardDto);
  }

  @ApiOperation({ summary: 'Get a card by ID' }) 
  @ApiParam({ name: 'id', type: 'string' }) 
  @ApiResponse({ status: 200, description: 'Card retrieved successfully' }) 
  @ApiNotFoundResponse({ description: 'Card not found' }) 
  @Get('/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardService.findOrThrowError(id);
  }

  @ApiOperation({ summary: 'Update a card by ID' }) 
  @ApiParam({ name: 'id', type: 'string' }) 
  @ApiBody({ type: UpdateCardDto }) 
  @ApiResponse({ status: 200, description: 'Card updated successfully' }) 
  @ApiNotFoundResponse({ description: 'Card not found' }) 
  @Patch('/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(id, updateCardDto);
  }

  @ApiOperation({ summary: 'Delete a card by ID' }) 
  @ApiParam({ name: 'id', type: 'string' }) 
  @ApiResponse({ status: 200, description: 'Card deleted successfully' }) 
  @ApiNotFoundResponse({ description: 'Card not found' }) 
  @Delete('/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardService.remove(id);
  }

  
}
