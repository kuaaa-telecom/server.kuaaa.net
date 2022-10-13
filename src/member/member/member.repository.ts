import { IMemberRepository } from './interface/member.repository.interface';
import { PrismaService } from '../../common/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateMemberPayload } from '../common/payload/create-members.payload';
import { MemberData } from './type/member-data.type';
import { MemberDataWithMajor } from './type/member-data-with-major.type';
import { MajorData } from './type/major-data.type';
import { UpdateMemberData } from './type/update-member-data.type';
import { CreateMemberData } from './type/create-member-data.type';

const MEMBER_DATA_SELECT = {
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
  memberAccount: {
    select: {
      nickname: true,
    },
  },
};

@Injectable()
export class MemberRepository implements IMemberRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getMemberById(id: string): Promise<MemberDataWithMajor | null> {
    return this.prisma.member.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        type: true,
        studentId: true,
        phone: true,
        email: true,
        registeredAt: true,
        address: true,
        generation: true,
        memberAccount: {
          select: {
            nickname: true,
          },
        },
        major: {
          select: {
            id: true,
            name: true,
            college: true,
          },
        },
      },
    });
  }

  async getMemberByStudentId(studentId: string): Promise<MemberData | null> {
    return this.prisma.member.findFirst({
      where: { studentId },
      select: MEMBER_DATA_SELECT,
    });
  }

  async createMembers(data: CreateMemberPayload[]): Promise<MemberData[]> {
    const memberInputs: CreateMemberData[] = data.map((member) => ({
      name: member.name,
      studentId: member.studentId,
      generation: Number(member.studentId.slice(2, 4)),
      majorId: member.majorId,
      registeredAt: member.registeredAt,
    }));

    // 한 transaction으로 처리
    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const members: MemberData[] = [];
      for await (const input of memberInputs) {
        const member: MemberData = await tx.member.create({
          data: input,
          select: MEMBER_DATA_SELECT,
        });
        members.push(member);
      }

      return members;
    });
  }

  async updateMember(id: string, data: UpdateMemberData): Promise<MemberData> {
    return this.prisma.member.update({
      where: { id },
      data: {
        name: data.name,
        studentId: data.studentId,
        generation: data.studentId
          ? Number(data.studentId.slice(2, 4))
          : undefined,
        majorId: data.majorId,
        type: data.type,
        registeredAt: data.registeredAt,
        email: data.email,
        phone: data.phone,
        address: data.address,
        memberAccount: {
          update: {
            nickname: data.nickname,
          },
        },
      },
      select: MEMBER_DATA_SELECT,
    });
  }

  async deleteMember(id: string): Promise<void> {
    await this.prisma.member.delete({
      where: { id },
    });
  }

  async getMajor(majorId: number): Promise<MajorData | null> {
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
