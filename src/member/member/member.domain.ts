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
  registeredAt!: Date;
  email!: string | null;
  phone!: string | null;
  address!: string | null;

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
  }

  // 나중에 다른 엔드포인트로 접근하는 경우 UpdateMemberPayload를 그대로 쓰는게 아니라 새로운 type을 만들어야 할듯.
  async updateMember(data: UpdateMemberPayload): Promise<MemberDomain> {
    console.log(data);
    if (data.studentId) {
      await this.validateStudentId(data.studentId);
    }

    if (data.majorId !== undefined) {
      await this.validateMajor(data.majorId);
    }

    // db에 반영
    const updatedData: MemberDomainData =
      await this.memberRepository.updateMember(this.id, data);

    // 업데이트한 데이터로 domain을 새로 만들어서 반환
    return new MemberDomain(this.memberRepository, updatedData);
  }

  // 이후 auth 추가되면, auth가 있는 경우는 어떻게 할지 정책을 정해야 할 필요가 있음.
  async deleteMember(): Promise<void> {
    await this.memberRepository.deleteMember(this.id);
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
