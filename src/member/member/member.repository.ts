import { IMemberRepository } from './interface/member.repository.interface';
import { PrismaService } from '../../common/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { MemberDomainData } from './type/member-domain-data.type';
import { Major } from '@prisma/client';

@Injectable()
export class MemberRepository implements IMemberRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getMemberById(id: string): Promise<MemberDomainData | null> {
    return {} as MemberDomainData;
  }

  async createMembers(
    members: CreateMemberData[],
  ): Promise<MemberDomainData[]> {
    return Promise.resolve([]);
  }

  async getMembersActiveInfo(
    studentIds: string[],
  ): Promise<MemberActiveInfo[]> {
    return Promise.resolve([]);
  }

  async recreateMemberByStudentId(
    members: CreateMemberData[],
  ): Promise<MemberDomainData[]> {
    return Promise.resolve([]);
  }

  async updateMember(id: string, member: UpdateMemberData): Promise<void> {
    return Promise.resolve(undefined);
  }

  async deleteMember(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  async getMajor(majorId: number): Promise<Major | null> {
    return Promise.resolve(null);
  }

  async getMemberByStudentId(
    studentId: string,
  ): Promise<MemberDomainData | null> {
    return Promise.resolve(null);
  }
}
