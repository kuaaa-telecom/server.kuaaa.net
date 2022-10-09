import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMembersPayload } from '../common/payload/create-members.payload';
import { MemberDomain } from './member.domain';
import { IMemberRepository } from './interface/member.repository.interface';
import { MemberDomainData } from './type/member-domain-data.type';

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
    // 1. generation 데이터 파싱
    // 2. 학번으로 유효성 체크
    // 3. 만약 학번이 존재하면, isActive = false면 해당 ID로 update. true면 에러.
    // 4. 학번이 존재하지 않으면, 생성
    // 5. 각각의 로직에 따라 생성 후 합쳐서 리턴.
    return this.memberRepository.createMembers(data as any);
  }
}
