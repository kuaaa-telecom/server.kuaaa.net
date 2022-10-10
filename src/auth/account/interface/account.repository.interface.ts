import { AccountDomainData } from '../type/account-domain-data.type';
import { CreateAccountData } from '../type/create-account-data.type';

export interface IAccountRepository {
  getAccountByStudentId(studentId: string): Promise<AccountDomainData | null>;
  getMemberIdByStudentIdAndName(
    studentId: string,
    name: string,
  ): Promise<string | null>;
  isAccountExistByNickname(nickname: string): Promise<boolean>;
  createAccount(
    memberId: string,
    data: CreateAccountData,
  ): Promise<AccountDomainData>;
}
