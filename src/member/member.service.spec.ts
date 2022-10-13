import { Test, TestingModule } from '@nestjs/testing';
import { MemberAdminService } from './member.admin.service';

describe('MemberService', () => {
  let service: MemberAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberAdminService],
    }).compile();

    service = module.get<MemberAdminService>(MemberAdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
