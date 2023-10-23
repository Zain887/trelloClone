import { Test, TestingModule } from '@nestjs/testing';
import { BoardMemberController } from './board_member.controller';
import { BoardMemberService } from './board_member.service';

describe('BoardMemberController', () => {
  let controller: BoardMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardMemberController],
      providers: [BoardMemberService],
    }).compile();

    controller = module.get<BoardMemberController>(BoardMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
