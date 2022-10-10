import { IAccountRepository } from './interface/account.repository.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';
import { AccountDomainData } from './type/account-domain-data.type';
import { CreateAccountData } from './type/create-account-data.type';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAccount(
    memberId: string,
    data: CreateAccountData,
  ): Promise<AccountDomainData> {
    return {} as any;
  }

  async getAccountByStudentId(
    studentId: string,
  ): Promise<AccountDomainData | null> {
    return null;
  }

  async getMemberIdByStudentIdAndName(
    studentId: string,
    name: string,
  ): Promise<string> {
    return Promise.resolve('');
  }

  async isMemberExistByNickname(nickname: string): Promise<boolean> {
    return Promise.resolve(false);
  }
}
