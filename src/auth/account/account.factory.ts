import { SignupPayload } from '../common/payload/signup.payload';
import { AccountDomain } from './account.domain';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IAccountRepository } from './interface/account.repository.interface';
import { AccountDomainData } from './type/account-domain-data.type';
import { CreateAccountData } from './type/create-account-data.type';

@Injectable()
export class AccountFactory {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository,
    @Inject('IPasswordService')
    private readonly passwordService: IPasswordService,
  ) {}

  async getAccountByMemberId(memberId: string): Promise<AccountDomain | null> {
    const accountData: AccountDomainData | null =
      await this.accountRepository.getAccountByMemberId(memberId);

    if (!accountData) {
      return null;
    }

    return new AccountDomain(this.passwordService, accountData);
  }

  async getAccountByStudentId(studentId: string): Promise<AccountDomain> {
    const accountData: AccountDomainData | null =
      await this.accountRepository.getAccountByStudentId(studentId);

    if (!accountData) {
      throw new NotFoundException('해당 학번의 계정이 존재하지 않습니다.');
    }

    return new AccountDomain(this.passwordService, accountData);
  }

  async createAccount(data: SignupPayload): Promise<AccountDomain> {
    // 학번, 이름으로 validation => memberId 가져옴
    const memberId: string | null =
      await this.accountRepository.getMemberIdByStudentIdAndName(
        data.studentId,
        data.name,
      );

    if (!memberId) {
      throw new NotFoundException(
        '해당 학번과 이름의 회원 기록이 존재하지 않습니다.',
      );
    }

    // 그 ID로 이미 계정이 있는지 확인
    const account: AccountDomainData | null =
      await this.accountRepository.getAccountByMemberId(memberId);

    if (account) {
      throw new ConflictException('이미 계정이 존재합니다.');
    }

    // 닉네임 중복 validation => 있는지 확인(없어야 함)
    const isMemberExistByNickname: boolean =
      await this.accountRepository.isAccountExistByNickname(data.nickname);

    if (isMemberExistByNickname) {
      throw new ConflictException('이미 사용 중인 닉네임입니다.');
    }

    const createAccountData: CreateAccountData = {
      password: await this.passwordService.getEncryptPassword(data.password),
      nickname: data.nickname,
    };
    const accountData: AccountDomainData =
      await this.accountRepository.createAccount(memberId, createAccountData);

    return new AccountDomain(this.passwordService, accountData);
  }
}
