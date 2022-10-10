import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMembersPayload } from '../common/payload/create-members.payload';
import { MemberDomain } from './member.domain';
import { IMemberRepository } from './interface/member.repository.interface';
import { MemberDomainData } from './type/member-domain-data.type';
import * as _ from 'lodash';

@Injectable()
export class MemberFactory {
  constructor(
    @Inject('IMemberRepository')
    private readonly memberRepository: IMemberRepository,
  ) {}

  async getMemberById(memberId: string): Promise<MemberDomain> {
    const memberData: MemberDomainData | null =
      await this.memberRepository.getMemberById(memberId);

    if (!memberData) {
      throw new NotFoundException(`Member Id: ${memberId}를 찾을 수 없습니다.`);
    }

    return new MemberDomain(this.memberRepository, memberData);
  }

  async createMembers(data: CreateMembersPayload): Promise<MemberDomain[]> {
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

    const membersData: MemberDomainData[] =
      await this.memberRepository.createMembers(data.members);

    // 요청했던 studentId 순서대로 반환
    return memberStudentIds.map((studentId) => {
      const memberData: MemberDomainData = membersData.find(
        ({ studentId: id }) => id === studentId,
      )!;

      return new MemberDomain(this.memberRepository, memberData);
    });
  }
}
