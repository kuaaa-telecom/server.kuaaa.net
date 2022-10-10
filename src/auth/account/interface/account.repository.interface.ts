import { AccountDomainData } from '../type/account-domain-data.type';
import { CreateAccountData } from '../type/create-account-data.type';

export interface IAccountRepository {
  // member 혹은 account를 가져오는 메소드는 전부 isActive가 true인 것만 가져옴(제명/탈퇴된 회원은 가입, 로그인, 인증, 인가 전부 불가능)
  getAccountByMemberId(memberId: string): Promise<AccountDomainData | null>;
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
