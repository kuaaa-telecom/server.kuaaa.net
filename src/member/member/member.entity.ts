import { MemberType } from '@prisma/client';
import { MemberInput } from './type/member-input.type';
import { MajorInput } from './type/major-input.type';
import { IMemberRepository } from './interface/member.repository.interface';
import { UpdateMemberPayload } from '../common/payload/update-member.payload';
import { ConflictException } from '@nestjs/common';
import { Major } from './major.entity';
import { MemberData } from './type/member-data.type';
import { MajorData } from './type/major-data.type';

export class Member {
  id!: string;
  name!: string;
  type!: MemberType;
  studentId!: string;
  generation!: number;
  registeredAt!: Date;
  email!: string | null;
  phone!: string | null;
  address!: string | null;
  nickname!: string | null;
  majorId!: number;
  private major?: Major;

  constructor(
    private readonly memberRepository: IMemberRepository,
    data: MemberInput,
  ) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.studentId = data.studentId;
    this.generation = data.generation;
    this.registeredAt = data.registeredAt;
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address;
    this.majorId = data.major.id;
    this.nickname = data.nickname;

    // major에 MajorData를 담으면 key가 1개보다는 많음 => eager loading
    if (Object.keys(data.major).length > 1) {
      this.major = new Major(data.major as MajorInput);
    }
  }

  // 나중에 다른 엔드포인트로 접근하는 경우 UpdateMemberPayload를 그대로 쓰는게 아니라 새로운 type을 만들어야 할듯.
  async updateMember(data: UpdateMemberPayload): Promise<Member> {
    if (data.studentId) {
      await this.validateStudentId(data.studentId);
    }

    if (data.majorId !== undefined) {
      await this.validateMajor(data.majorId);
    }

    // db에 반영
    const updatedData: MemberData = await this.memberRepository.updateMember(
      this.id,
      data,
    );

    const memberInput: MemberInput = {
      id: updatedData.id,
      name: updatedData.name,
      type: updatedData.type,
      studentId: updatedData.studentId,
      generation: updatedData.generation,
      registeredAt: updatedData.registeredAt,
      email: updatedData.email,
      phone: updatedData.phone,
      address: updatedData.address,
      nickname: updatedData.memberAccount?.nickname ?? null,
      major: { id: updatedData.majorId },
    };

    // 업데이트한 데이터로 domain을 새로 만들어서 반환
    return new Member(this.memberRepository, memberInput);
  }

  // 다른 테이블에 데이터 쌓이면?
  async deleteMember(): Promise<void> {
    const isAccountExist = await this.memberRepository.isAccountExist(this.id);
    if (isAccountExist) throw new ConflictException('계정이 존재합니다.');
    await this.memberRepository.deleteMember(this.id);
  }

  async getMajor(): Promise<Major> {
    if (!this.major) {
      const majorData: MajorData | null = await this.memberRepository.getMajor(
        this.majorId,
      );

      const majorInput: MajorInput = {
        id: majorData!.id,
        name: majorData!.name,
        college: majorData!.college,
      };

      this.major = new Major(majorInput);
    }
    return this.major;
  }

  private async validateStudentId(studentId: string): Promise<void> {
    const member: MemberData | null =
      await this.memberRepository.getMemberByStudentId(studentId);

    if (member?.id !== this.id)
      throw new ConflictException('이미 존재하는 학번입니다.');
  }

  private async validateMajor(majorId: number): Promise<void> {
    const major: MajorData | null = await this.memberRepository.getMajor(
      majorId,
    );
    if (!major) throw new ConflictException('존재하지 않는 전공입니다.');
  }
}
