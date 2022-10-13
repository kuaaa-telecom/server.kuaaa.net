import { Injectable } from '@nestjs/common';
import { MemberFactory } from './member/member.factory';
import { Account } from '../auth/account/account.entity';
import { MemberInfoDto } from './common/dto/member-info.dto';
import { Member } from './member/member.entity';
import { UpdateMemberPayload } from './common/payload/update-member.payload';
import { UpdateMemberData } from './member/type/update-member-data.type';

@Injectable()
export class MemberService {
  constructor(private readonly memberFactory: MemberFactory) {}

  async getMember(account: Account): Promise<MemberInfoDto> {
    const member: Member = await this.memberFactory.getMemberById(
      account.memberId,
    );

    return MemberInfoDto.of(member);
  }

  async updateMember(
    account: Account,
    payload: UpdateMemberPayload,
  ): Promise<void> {
    const member: Member = await this.memberFactory.getMemberById(
      account.memberId,
    );

    const updateData: UpdateMemberData = {
      email: payload.email,
      phone: payload.phone,
      address: payload.address,
      nickname: payload.nickname,
    };

    await member.updateMember(updateData);
  }
}
