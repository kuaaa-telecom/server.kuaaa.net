import { MemberType } from '@prisma/client';
import { MemberDomainData } from './type/member-domain-data.type';
import { IMemberRepository } from './interface/member.repository.interface';

export class MemberDomain {
  id!: string;
  name!: string;
  type!: MemberType;
  studentId!: string;
  generation!: number;
  majorId!: number;
  registeredAt!: string;
  email!: string | null;
  phone!: string | null;
  address!: string | null;
  isActive!: boolean;

  constructor(
    private readonly memberRepository: IMemberRepository,
    data: MemberDomainData,
  ) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.studentId = data.studentId;
    this.generation = data.generation;
    this.majorId = data.majorId;
    this.registeredAt = data.registeredAt;
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address;
    this.isActive = data.isActive;
  }
}
