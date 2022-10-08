import { Injectable } from '@nestjs/common';
import { CreateMembersPayload } from './payload/create-members.payload';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateMemberPayload } from './payload/update-member.payload';

@Injectable()
export class MemberService {
  async createMembers(payload: CreateMembersPayload): Promise<CreateResultDto> {
    return {} as any;
  }

  async updateMember(id: string, payload: UpdateMemberPayload): Promise<void> {
    return;
  }

  async deleteMember(id: string): Promise<void> {
    return;
  }
}
