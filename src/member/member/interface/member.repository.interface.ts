import { MemberDomainData } from '../type/member-domain-data.type';
import { Major } from '@prisma/client';

export interface IMemberRepository {
  getMemberById(id: string): Promise<MemberDomainData | null>;
  getMemberByStudentId(studentId: string): Promise<MemberDomainData | null>;
  createMembers(members: CreateMemberData[]): Promise<MemberDomainData[]>;
  recreateMemberByStudentId(
    members: CreateMemberData[],
  ): Promise<MemberDomainData[]>;
  getMembersActiveInfo(studentIds: string[]): Promise<MemberActiveInfo[]>;
  updateMember(id: string, member: UpdateMemberData): Promise<void>;
  deleteMember(id: string): Promise<void>;
  getMajor(majorId: number): Promise<Major | null>;
}
