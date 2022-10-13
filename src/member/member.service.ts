import { Injectable } from '@nestjs/common';
import { CreateMembersPayload } from './common/payload/create-members.payload';
import { CreateResultDto } from './common/dto/create-result.dto';
import { UpdateMemberPayload } from './common/payload/update-member.payload';
import { MemberFactory } from './member/member.factory';
import { Member } from './member/member.entity';

@Injectable()
export class MemberService {
  constructor(private readonly memberFactory: MemberFactory) {}

  async createMembers(payload: CreateMembersPayload): Promise<CreateResultDto> {
    const members: Member[] = await this.memberFactory.createMembers(payload);
    return { memberIds: members.map((member) => member.id) };
  }

  async updateMember(id: string, payload: UpdateMemberPayload): Promise<void> {
    const member = await this.memberFactory.getMemberById(id);
    await member.updateMember(payload);
  }

  async deleteMember(id: string): Promise<void> {
    const member = await this.memberFactory.getMemberById(id);
    await member.deleteMember();
  }
}
