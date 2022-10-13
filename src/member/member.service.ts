import { Injectable } from '@nestjs/common';
import { MemberFactory } from './member/member.factory';
import { Account } from '../auth/account/account.entity';
import { MemberInfoDto } from './common/dto/member-info.dto';

@Injectable()
export class MemberService {
  constructor(private readonly memberFactory: MemberFactory) {}

  async getMember(account: Account): Promise<MemberInfoDto> {
    const member = await this.memberFactory.getMemberById(account.memberId);
    return {} as any;
  }
}
