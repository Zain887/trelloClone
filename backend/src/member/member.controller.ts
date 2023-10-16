import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
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
  async create(@Body() createMemberDto: CreateMemberDto, @User('userId') userId: string) {
    return await this.memberService.create(createMemberDto, userId);
  }
  
  @Get()
  async findAll() {
    return await this.memberService.findAll();
  }
  @Delete(':memberId')
  async delete(@Param('memberId') memberId: string) {
    await this.memberService.delete(memberId);
    return { message: 'Member deleted successfully' };
  }
  
  @Post(':BoardId')
  async addMemberToBoard(@Body('email') createMemberDto, @Param('BoardId') BoardId: string, @User('userId') userId) {
    return await this.memberService.addMemberToBoard(BoardId, userId, createMemberDto);
  }

  @Get('/board/:BoardId')
  async getAllMembersByBoardId(@Param('BoardId') BoardId: string) {
    return await this.memberService.getAllMembersByBoardId(BoardId);
  }

  @Delete(':memberId')
  async removeMemberFromBoard(@Param('memberId') memberId: string) {
    await this.memberService.removeMemberFromBoard(memberId);
    return { message: 'Member deleted successfully' };
  }

  // @Get()
  // async findAll(): Promise<MemberEntity[]> {
  //   return await this.memberService.findAll();
  // }

  @Get(':id')
  async findOne(@Param('id') id: string) {

    return await this.memberService.findOne(id);

  }

  // @Post()
  // async create(@Body() memberData){
  //   return await this.memberService.create(memberData);
  // }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() memberData){
  //   return await this.memberService.update(id, memberData);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string){
  //   await this.memberService.remove(id);
  // }
}
