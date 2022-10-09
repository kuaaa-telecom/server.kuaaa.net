import { IMemberRepository } from './interface/member.repository.interface';
import { PrismaService } from '../../common/services/prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { MemberDomainData } from './type/member-domain-data.type';
import { Major, Prisma } from '@prisma/client';
import _ from 'lodash';
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
      where: { id, isActive: true },
      select: memberDomainDataSelect,
    });
  }

  async getMemberByStudentId(
    studentId: string,
  ): Promise<MemberDomainData | null> {
    return this.prisma.member.findFirst({
      where: { studentId, isActive: true },
      select: memberDomainDataSelect,
    });
  }

  async createMembers(
    data: CreateMemberPayload[],
  ): Promise<MemberDomainData[]> {
    const members: CreateMemberData[] = data.map((member) => ({
      name: member.name,
      studentId: member.studentId,
      generation: Number(member.studentId.slice(2, 3)),
      majorId: member.majorId,
      registeredAt: member.registeredAt,
      email: member.email ?? null,
      phone: member.phone ?? null,
      address: member.address ?? null,
    }));
    // soft delete를 해제하는 방식으로 추가할 member
    const membersNeedRecreate: CreateMemberData[] =
      await this.findMemberIdsNeedRecreate(members);
    // 그냥 추가할 member
    const membersNeedCreate: CreateMemberData[] = _.difference(
      members,
      membersNeedRecreate,
    );

    // 한 transaction으로 처리
    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const members: MemberDomainData[] = [];
      for await (const data of membersNeedCreate) {
        const member: MemberDomainData = await tx.member.create({
          data,
          select: memberDomainDataSelect,
        });
        members.push(member);
      }

      for await (const data of membersNeedRecreate) {
        const member: MemberDomainData = await tx.member.update({
          where: { studentId: data.studentId },
          data: {
            ...data,
            isActive: true,
          },
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
        generation: Number(data.studentId?.slice(2, 3)),
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
    await this.prisma.member.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async getMajor(majorId: number): Promise<Major | null> {
    return this.prisma.major.findFirst({
      where: { id: majorId },
    });
  }

  private async findMemberIdsNeedRecreate(
    members: CreateMemberData[],
  ): Promise<CreateMemberData[]> {
    // 받아온 data 중에, soft delete되어있거나, 존재하는 member를 찾음
    const membersActiveInfo: MemberActiveInfo[] =
      await this.prisma.member.findMany({
        where: { studentId: { in: members.map(({ studentId }) => studentId) } },
        select: {
          studentId: true,
          isActive: true,
        },
      });

    // isActive가 true면 create 불가능
    const activeMemberIds: string[] = membersActiveInfo
      .filter(({ isActive }) => isActive)
      .map(({ studentId }) => studentId);

    if (activeMemberIds.length) {
      throw new ConflictException(
        `학번: ${activeMemberIds}에 해당하는 데이터가 이미 존재합니다.`,
      );
    }

    // 여기까지 왔다면 전부 soft delete된 member
    return members.filter(({ studentId }) =>
      membersActiveInfo.map((info) => info.studentId).includes(studentId),
    );
  }
}
