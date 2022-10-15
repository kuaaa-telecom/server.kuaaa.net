import { IMemberRepository } from './interface/member.repository.interface';
import { PrismaService } from '../../common/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { MemberDomainData } from './type/member-domain-data.type';
import { Major, Prisma } from '@prisma/client';
import { UpdateMemberPayload } from '../common/payload/update-member.payload';
import { CreateMemberPayload } from '../common/payload/create-members.payload';

const memberDomainDataSelect = {
  id: true,
  name: true,
  type: true,
  studentId: true,
  generation: true,
  majorId: true,
  registeredAt: true,
  email: true,
  phone: true,
  address: true,
};

@Injectable()
export class MemberRepository implements IMemberRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getMemberById(id: string): Promise<MemberDomainData | null> {
    return this.prisma.member.findFirst({
      where: { id },
      select: memberDomainDataSelect,
    });
  }

  async getMemberByStudentId(
    studentId: string,
  ): Promise<MemberDomainData | null> {
    return this.prisma.member.findFirst({
      where: { studentId },
      select: memberDomainDataSelect,
    });
  }

  async createMembers(
    data: CreateMemberPayload[],
  ): Promise<MemberDomainData[]> {
    const memberInputs: CreateMemberData[] = data.map((member) => ({
      name: member.name,
      studentId: member.studentId,
      generation: Number(member.studentId.slice(2, 4)),
      majorId: member.majorId,
      registeredAt: member.registeredAt,
      email: member.email ?? null,
      phone: member.phone ?? null,
      address: member.address ?? null,
    }));

    // 한 transaction으로 처리
    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const members: MemberDomainData[] = [];
      for await (const input of memberInputs) {
        const member: MemberDomainData = await tx.member.create({
          data: input,
          select: memberDomainDataSelect,
        });
        members.push(member);
      }

      return members;
    });
  }

  async updateMember(
    id: string,
    data: UpdateMemberPayload,
  ): Promise<MemberDomainData> {
    return this.prisma.member.update({
      where: { id },
      data: {
        name: data.name,
        studentId: data.studentId,
        generation: data.studentId
          ? Number(data.studentId.slice(2, 4))
          : undefined,
        majorId: data.majorId,
        registeredAt: data.registeredAt,
        email: data.email,
        phone: data.phone,
        address: data.address,
      },
      select: memberDomainDataSelect,
    });
  }

  async deleteMember(id: string): Promise<void> {
    await this.prisma.member.delete({
      where: { id },
    });
  }

  async getMajor(majorId: number): Promise<Major | null> {
    return this.prisma.major.findUnique({
      where: { id: majorId },
    });
  }

  async getExistingMemberStudentIds(studentIds: string[]): Promise<string[]> {
    const duplicatedStudentIds = await this.prisma.member.findMany({
      where: { studentId: { in: studentIds } },
      select: {
        studentId: true,
      },
    });

    return duplicatedStudentIds.map(({ studentId }) => studentId);
  }

  async isAccountExist(id: string): Promise<boolean> {
    const account = await this.prisma.memberAccount.findUnique({
      where: { memberId: id },
    });

    return Boolean(account);
  }
}
