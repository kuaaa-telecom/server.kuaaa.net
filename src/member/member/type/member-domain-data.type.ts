import { MemberType } from '@prisma/client';

export type MemberDomainData = {
  id: string;
  name: string;
  type: MemberType;
  studentId: string;
  generation: number;
  majorId: number;
  registeredAt: Date;
  email: string | null;
  phone: string | null;
  address: string | null;
};
