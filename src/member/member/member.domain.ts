import { MemberType, Major } from '@prisma/client';
import { MemberDomainData } from './type/member-domain-data.type';
import { IMemberRepository } from './interface/member.repository.interface';
import { UpdateMemberPayload } from '../common/payload/update-member.payload';
import { ConflictException } from '@nestjs/common';

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

  // 나중에 다른 엔드포인트로 접근하는 경우 UpdateMemberPayload를 그대로 쓰는게 아니라 새로운 type을 만들어야 할듯.
  async updateMember(data: UpdateMemberPayload): Promise<void> {
    if (data.studentId) {
      await this.validateStudentId(data.studentId);
    }

    if (data.majorId) {
      await this.validateMajor(data.majorId);
    }

    const updateData: UpdateMemberData = {
      name: data.name,
      studentId: data.studentId,
      generation: Number(data.studentId?.slice(2, 3)),
      majorId: data.majorId,
      registeredAt: data.registeredAt,
      email: data.email,
      phone: data.phone,
      address: data.address,
    };

    // db에 반영
    await this.memberRepository.updateMember(this.id, updateData);

    // 업데이트된 데이터를 domain field에 반영
    this.name = updateData.name ?? this.name;
    this.studentId = updateData.studentId ?? this.studentId;
    this.generation = updateData.generation ?? this.generation;
    this.majorId = updateData.majorId ?? this.majorId;
    this.registeredAt = updateData.registeredAt ?? this.registeredAt;
    this.email = updateData.email ?? this.email;
    this.phone = updateData.phone ?? this.phone;
    this.address = updateData.address ?? this.address;
  }

  private async validateStudentId(studentId: string): Promise<void> {
    const member: MemberDomainData | null =
      await this.memberRepository.getMemberByStudentId(studentId);

    if (member && member.id !== this.id)
      throw new ConflictException('이미 존재하는 학번입니다.');
  }

  private async validateMajor(majorId: number): Promise<void> {
    const major: Major | null = await this.memberRepository.getMajor(majorId);

    if (!major) throw new ConflictException('존재하지 않는 전공입니다.');
  }
}
