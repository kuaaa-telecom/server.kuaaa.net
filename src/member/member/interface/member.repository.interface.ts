import { CreateMemberPayload } from '../../common/payload/create-members.payload';
import { MemberData } from '../type/member-data.type';
import { MemberDataWithMajor } from '../type/member-data-with-major.type';
import { MajorData } from '../type/major-data.type';
import { UpdateMemberData } from '../type/update-member-data.type';

export interface IMemberRepository {
  getMemberById(id: string): Promise<MemberDataWithMajor | null>;
  getMemberByStudentId(studentId: string): Promise<MemberData | null>;
  createMembers(data: CreateMemberPayload[]): Promise<MemberData[]>;
  updateMember(id: string, data: UpdateMemberData): Promise<MemberData>;
  deleteMember(id: string): Promise<void>;
  getExistingMemberStudentIds(studentIds: string[]): Promise<string[]>;
  getMajor(majorId: number): Promise<MajorData | null>;
  isAccountExist(id: string): Promise<boolean>;
}
