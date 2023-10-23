import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { User } from 'src/user/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@ApiTags('members')
@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) { }

  @Post()
  async create(@Body() createMemberDto: CreateMemberDto, @Query('userId') userId: string) {
    return await this.memberService.create(createMemberDto, userId);
  }
  // @Post()
  // async create(@Body() createMemberDto: CreateMemberDto, @User('userId') userId: string) {
  //   return await this.memberService.create(createMemberDto, userId);
  // }

  @Get()
  async findAll() {
    return await this.memberService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.memberService.findOne(id);
  }

  @Delete(':memberId')
  async delete(@Param('memberId') memberId: string) {
    await this.memberService.delete(memberId);
    return { message: 'Member deleted successfully' };
  }




  // member related things
  @Post('/:BoardId')
  async addMemberToBoard(@Body('email') createMemberDto, @Param('BoardId') BoardId: string, @Query('userId') userId) {
    return await this.memberService.addMemberToBoard(BoardId, userId, createMemberDto);
  }
  // @Post('/:BoardId')
  // async addMemberToBoard(@Body('email') createMemberDto, @Param('BoardId') BoardId: string, @User('userId') userId) {
  //   return await this.memberService.addMemberToBoard(BoardId, userId, createMemberDto);
  // }

  @Get('board/:BoardId')
  async getAllMembersByBoardId(@Param('BoardId') BoardId: string) {
    return await this.memberService.getAllMembersByBoardId(BoardId);
  }


  @Delete('board/:BoardId')
  async removeMemberFromBoard(@Param('BoardId') BoardId: string, @Body('email') email: string) {
    await this.memberService.removeMemberFromBoard(BoardId, email);
    return { message: 'Member deleted successfully from the board' };
  }



}
