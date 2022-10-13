import { Test, TestingModule } from '@nestjs/testing';
import { MemberAdminController } from './member.admin.controller';

describe('MemberController', () => {
  let controller: MemberAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberAdminController],
    }).compile();

    controller = module.get<MemberAdminController>(MemberAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
