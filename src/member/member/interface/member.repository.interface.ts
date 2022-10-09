import { MemberDomain } from '../member.domain';
import { CreateMembersData } from '../type/create-member-data.type';

export interface IMemberRepository {
  getMemberById(id: string): Promise<MemberDomain | null>;
  createMembers(data: CreateMembersData): Promise<MemberDomain[]>;
}
