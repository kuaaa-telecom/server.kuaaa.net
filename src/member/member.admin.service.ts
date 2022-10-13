import { Injectable } from '@nestjs/common';
import { CreateMembersPayload } from './common/payload/create-members.payload';
import { CreateResultDto } from './common/dto/create-result.dto';
import { UpdateMemberByAdminPayload } from './common/payload/update-member-by-admin.payload';
import { MemberFactory } from './member/member.factory';
import { Member } from './member/member.entity';
import { UpdateMemberData } from './member/type/update-member-data.type';

@Injectable()
export class MemberAdminService {
  constructor(private readonly memberFactory: MemberFactory) {}

  async createMembers(payload: CreateMembersPayload): Promise<CreateResultDto> {
    const members: Member[] = await this.memberFactory.createMembers(payload);
    return { memberIds: members.map((member) => member.id) };
  }

  async updateMember(
    id: string,
    payload: UpdateMemberByAdminPayload,
  ): Promise<void> {
    const member = await this.memberFactory.getMemberById(id);

    const updateData: UpdateMemberData = {
      name: payload.name,
      type: payload.type,
      studentId: payload.studentId,
      registeredAt: payload.registeredAt,
      majorId: payload.majorId,
      email: payload.email,
      phone: payload.phone,
      address: payload.address,
    };
    await member.updateMember(updateData);
  }

  async deleteMember(id: string): Promise<void> {
    const member = await this.memberFactory.getMemberById(id);
    await member.deleteMember();
  }
}
