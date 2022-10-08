import { Injectable } from '@nestjs/common';
import { CreateMembersPayload } from '../common/payload/create-members.payload';
import { MemberDomain } from './member.domain';

@Injectable()
export class MemberFactory {
  async getMemberById(id: string): Promise<MemberDomain> {
    return {} as MemberDomain;
  }

  async createMembers(data: CreateMembersPayload): Promise<MemberDomain[]> {
    return [];
  }
}
