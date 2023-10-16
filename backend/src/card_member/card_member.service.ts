import { Injectable } from '@nestjs/common';
import { CreateCardMemberDto } from './dto/create-card_member.dto';
import { UpdateCardMemberDto } from './dto/update-card_member.dto';

@Injectable()
export class CardMemberService {
  create(createCardMemberDto: CreateCardMemberDto) {
    return 'This action adds a new cardMember';
  }

  findAll() {
    return `This action returns all cardMember`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cardMember`;
  }

  update(id: number, updateCardMemberDto: UpdateCardMemberDto) {
    return `This action updates a #${id} cardMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} cardMember`;
  }
}
