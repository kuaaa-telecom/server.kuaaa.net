import { MemberType } from '@prisma/client';
import { MajorInput } from './major-input.type';

export type MemberInput = {
  id: string;
  name: string;
  type: MemberType;
  studentId: string;
  generation: number;
  registeredAt: Date;
  email: string | null;
  phone: string | null;
  address: string | null;
  nickname: string | null;
  // major에 id를 담으면 lazy loading, major에 MajorData를 담으면 eager loading
  major: { id: number } | MajorInput;
};
