import { IAccountRepository } from './interface/account.repository.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';
import { AccountDomainData } from './type/account-domain-data.type';
import { CreateAccountData } from './type/create-account-data.type';

const accountSelect = {
  nickname: true,
  password: true,
  member: {
    select: {
      id: true,
      name: true,
      studentId: true,
      type: true,
    },
  },
};

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAccountByStudentId(
    studentId: string,
  ): Promise<AccountDomainData | null> {
    const result = await this.prisma.memberAccount.findFirst({
      where: {
        member: {
          studentId,
        },
      },
      select: accountSelect,
    });

    if (!result) return null;
    return {
      memberId: result.member.id,
      password: result.password,
      name: result.member.name,
      studentId: result.member.studentId,
      nickname: result.nickname,
      type: result.member.type,
    };
  }

  async createAccount(
    memberId: string,
    data: CreateAccountData,
  ): Promise<AccountDomainData> {
    const result = await this.prisma.memberAccount.create({
      data: {
        ...data,
        member: {
          connect: {
            id: memberId,
          },
        },
      },
      select: accountSelect,
    });

    return {
      memberId: result.member.id,
      password: result.password,
      name: result.member.name,
      studentId: result.member.studentId,
      nickname: result.nickname,
      type: result.member.type,
    };
  }

  async getMemberIdByStudentIdAndName(
    studentId: string,
    name: string,
  ): Promise<string | null> {
    const result = await this.prisma.member.findFirst({
      where: {
        studentId,
        name,
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!result || result.name !== name) return null;
    return result.id;
  }

  async isAccountExistByNickname(nickname: string): Promise<boolean> {
    return this.prisma.memberAccount
      .findFirst({
        where: {
          nickname,
        },
      })
      .then((account) => Boolean(account));
  }
}
