import { MemberType } from '@prisma/client';

export type UpdateMemberData = {
  name?: string;
  type?: MemberType;
  studentId?: string;
  generation?: number;
  registeredAt?: Date;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  majorId?: number;
  nickname?: string;
};
