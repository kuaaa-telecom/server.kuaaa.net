import { MemberDomainData } from '../type/member-domain-data.type';
import { Major } from '@prisma/client';
import { UpdateMemberPayload } from '../../common/payload/update-member.payload';
import { CreateMemberPayload } from '../../common/payload/create-members.payload';

export interface IMemberRepository {
  getMemberById(id: string): Promise<MemberDomainData | null>;
  getMemberByStudentId(studentId: string): Promise<MemberDomainData | null>;
  createMembers(data: CreateMemberPayload[]): Promise<MemberDomainData[]>;
  updateMember(
    id: string,
    data: UpdateMemberPayload,
  ): Promise<MemberDomainData>;
  deleteMember(id: string): Promise<void>;
  getExistingMemberStudentIds(studentIds: string[]): Promise<string[]>;
  getMajor(majorId: number): Promise<Major | null>;
}
