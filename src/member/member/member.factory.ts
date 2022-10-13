import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMembersPayload } from '../common/payload/create-members.payload';
import { Member } from './member.entity';
import { IMemberRepository } from './interface/member.repository.interface';
import { MemberInput } from './type/member-input.type';
import * as _ from 'lodash';
import { MemberData } from './type/member-data.type';
import { MemberDataWithMajor } from './type/member-data-with-major.type';

@Injectable()
export class MemberFactory {
  constructor(
    @Inject('IMemberRepository')
    private readonly memberRepository: IMemberRepository,
  ) {}

  async getMemberById(memberId: string): Promise<Member> {
    const memberData: MemberDataWithMajor | null =
      await this.memberRepository.getMemberById(memberId);

    if (!memberData) {
      throw new NotFoundException(`Member Id: ${memberId}를 찾을 수 없습니다.`);
    }

    const memberInput: MemberInput = {
      id: memberData.id,
      name: memberData.name,
      type: memberData.type,
      studentId: memberData.studentId,
      generation: memberData.generation,
      registeredAt: memberData.registeredAt,
      email: memberData.email,
      phone: memberData.phone,
      address: memberData.address,
      major: {
        id: memberData.major.id,
        name: memberData.major.name,
        college: memberData.major.college,
      },
    };

    return new Member(this.memberRepository, memberInput);
  }

  async createMembers(data: CreateMembersPayload): Promise<Member[]> {
    // 학번 중복 체크
    const memberStudentIds = data.members.map(({ studentId }) => studentId);
    if (_.uniq(memberStudentIds).length !== memberStudentIds.length)
      throw new BadRequestException('요청에 중복된 학번이 있습니다.');

    // 이미 존재하는 학번인지 체크
    const existingMemberStudentIds =
      await this.memberRepository.getExistingMemberStudentIds(memberStudentIds);

    if (existingMemberStudentIds.length) {
      throw new ConflictException(
        `학번: ${existingMemberStudentIds}에 해당하는 데이터가 이미 존재합니다.`,
      );
    }

    const membersData: MemberData[] = await this.memberRepository.createMembers(
      data.members,
    );

    // 요청했던 studentId 순서대로 반환
    return memberStudentIds.map((studentId) => {
      const memberData: MemberData = membersData.find(
        ({ studentId: id }) => id === studentId,
      )!;

      const memberInput: MemberInput = {
        id: memberData.id,
        name: memberData.name,
        type: memberData.type,
        studentId: memberData.studentId,
        generation: memberData.generation,
        registeredAt: memberData.registeredAt,
        email: memberData.email,
        phone: memberData.phone,
        address: memberData.address,
        major: {
          id: memberData.majorId,
        },
      };

      return new Member(this.memberRepository, memberInput);
    });
  }
}
