import { IMemberRepository } from './interface/member.repository.interface';
import { PrismaService } from '../../common/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateMembersData } from './type/create-member-data.type';
import { MemberDomainData } from './type/member-domain-data.type';

@Injectable()
export class MemberRepository implements IMemberRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getMemberById(id: string): Promise<MemberDomainData | null> {
    return {} as MemberDomainData;
  }

  async createMembers(data: CreateMembersData): Promise<MemberDomainData[]> {
    return [];
  }
}
