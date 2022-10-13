import { MemberType } from '@prisma/client';
import { MajorData } from './major-data.type';

export type MemberDataWithMajor = {
  id: string;
  name: string;
  type: MemberType;
  studentId: string;
  generation: number;
  registeredAt: Date;
  email: string | null;
  phone: string | null;
  address: string | null;
  major: MajorData;
};
