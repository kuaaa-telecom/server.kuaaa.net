import { MemberType } from '@prisma/client';

export type MemberData = {
  id: string;
  name: string;
  type: MemberType;
  studentId: string;
  generation: number;
  registeredAt: Date;
  email: string | null;
  phone: string | null;
  address: string | null;
  majorId: number;
};
