import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoardMemberService } from './board_member.service';
import { CreateBoardMemberDto } from './dto/create-board_member.dto';
import { UpdateBoardMemberDto } from './dto/update-board_member.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@ApiTags('board-member')
@Controller('board-member')
export class BoardMemberController {
  constructor(private readonly boardMemberService: BoardMemberService) {}

  @Post()
  create(@Body() createBoardMemberDto: CreateBoardMemberDto) {
    return this.boardMemberService.create(createBoardMemberDto);
  }

  @Get()
  findAll() {
    return this.boardMemberService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.boardMemberService.findOne(+id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateBoardMemberDto: UpdateBoardMemberDto) {
    return this.boardMemberService.update(+id, updateBoardMemberDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.boardMemberService.remove(+id);
  }
}
