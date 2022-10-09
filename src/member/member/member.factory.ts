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
import _ from 'lodash';

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
      throw new BadRequestException('중복된 학번이 있습니다.');

    // 데이터가 있지만 is_active가 false인 경우와 아예 데이터가 없는 경우를 나누어서 처리해야함.
    const studentIdsNeedRecreate: string[] =
      await this.findMemberIdsNeedRecreate(memberStudentIds);
    const studentIdsNeedCreate: string[] = _.difference(
      memberStudentIds,
      studentIdsNeedRecreate,
    );

    const createMembersData: CreateMemberData[] = data.members.map(
      (member) => ({
        name: member.name,
        studentId: member.studentId,
        generation: Number(member.studentId.slice(2, 3)),
        majorId: member.majorId,
        registeredAt: member.registeredAt,
        email: member.email ?? null,
        phone: member.phone ?? null,
        address: member.address ?? null,
      }),
    );

    // 각 방식에 따라 나누어서 member 생성
    const membersData: MemberDomainData[] = [
      ...(await this.memberRepository.createMembers(
        createMembersData.filter(({ studentId }) =>
          studentIdsNeedCreate.includes(studentId),
        ),
      )),
      ...(await this.memberRepository.recreateMemberByStudentId(
        createMembersData.filter(({ studentId }) =>
          studentIdsNeedRecreate.includes(studentId),
        ),
      )),
    ];

    // 요청했던 studentId 순서대로 반환
    return memberStudentIds.map((studentId) => {
      const memberData: MemberDomainData = membersData.find(
        ({ studentId: id }) => id === studentId,
      )!;

      return new MemberDomain(this.memberRepository, memberData);
    });
  }

  private async findMemberIdsNeedRecreate(
    studentIds: string[],
  ): Promise<string[]> {
    const membersActiveInfo: MemberActiveInfo[] =
      await this.memberRepository.getMembersActiveInfo(studentIds);

    const activeMemberIds: string[] = membersActiveInfo
      .filter(({ isActive }) => isActive)
      .map(({ studentId }) => studentId);

    if (activeMemberIds.length) {
      throw new ConflictException(
        `학번: ${activeMemberIds}에 해당하는 데이터가 이미 존재합니다.`,
      );
    }

    return membersActiveInfo.map(({ studentId }) => studentId);
  }
}
