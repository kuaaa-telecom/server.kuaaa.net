import { MemberDomainData } from '../type/member-domain-data.type';

export interface IMemberRepository {
  getMemberById(id: string): Promise<MemberDomainData | null>;
  createMembers(members: CreateMemberData[]): Promise<MemberDomainData[]>;
  recreateMemberByStudentId(
    members: CreateMemberData[],
  ): Promise<MemberDomainData[]>;
  getMembersActiveInfo(studentIds: string[]): Promise<MemberActiveInfo[]>;
}
