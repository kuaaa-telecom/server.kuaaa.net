import { SignupPayload } from '../common/payload/signup.payload';
import { AccountDomain } from './account.domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountFactory {
  constructor(private readonly passwordService: IPasswordService) {}

  async getAccountByStudentId(studentId: string): Promise<AccountDomain> {
    // db에서 조회
    // 객체 생성
    return new AccountDomain({} as any);
  }

  async createAccount(data: SignupPayload): Promise<AccountDomain> {
    // 학번, 이름으로 validation => 있는지 확인(있어야 함)
    // 닉네임 중복 validation => 있는지 확인(없어야 함)
    // 비밀번호 암호화 (서비스 생성)
    // db에 저장
    // 객체 생성
    return new AccountDomain({} as any);
  }
}
