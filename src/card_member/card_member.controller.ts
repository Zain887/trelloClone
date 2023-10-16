import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardMemberService } from './card_member.service';
import { CreateCardMemberDto } from './dto/create-card_member.dto';
import { UpdateCardMemberDto } from './dto/update-card_member.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@ApiTags('card-member')
@Controller('card-member')
export class CardMemberController {
  constructor(private readonly cardMemberService: CardMemberService) {}

  @Post()
  create(@Body() createCardMemberDto: CreateCardMemberDto) {
    return this.cardMemberService.create(createCardMemberDto);
  }

  @Get()
  findAll() {
    return this.cardMemberService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.cardMemberService.findOne(+id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateCardMemberDto: UpdateCardMemberDto) {
    return this.cardMemberService.update(+id, updateCardMemberDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.cardMemberService.remove(+id);
  }
}
