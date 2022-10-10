import { MemberType } from '@prisma/client';

export type AccountDomainData = {
  memberId: string;
  name: string;
  nickname: string;
  studentId: string;
  password: string;
  type: MemberType;
};
