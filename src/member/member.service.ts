import { Injectable } from '@nestjs/common';
import { CreateMembersPayload } from './common/payload/create-members.payload';
import { CreateResultDto } from './common/dto/create-result.dto';
import { UpdateMemberPayload } from './common/payload/update-member.payload';
import { MemberFactory } from './member/member.factory';
import { MemberDomain } from './member/member.domain';

@Injectable()
export class MemberService {
  constructor(private readonly memberFactory: MemberFactory) {}

  async createMembers(payload: CreateMembersPayload): Promise<CreateResultDto> {
    const members: MemberDomain[] = await this.memberFactory.createMembers(
      payload,
    );
    return { memberIds: members.map((member) => member.id) };
  }

  async updateMember(id: string, payload: UpdateMemberPayload): Promise<void> {
    return;
  }

  async deleteMember(id: string): Promise<void> {
    return;
  }
}
