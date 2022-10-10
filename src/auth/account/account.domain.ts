import { AccountDomainData } from './type/account-domain-data.type';
import { MemberType } from '@prisma/client';

export class AccountDomain {
  memberId!: string;
  studentId!: string;
  password!: string;
  name!: string;
  nickname!: string;
  type!: MemberType;

  constructor(
    private readonly passwordService: IPasswordService,
    data: AccountDomainData,
  ) {
    this.memberId = data.memberId;
    this.studentId = data.studentId;
    this.password = data.password;
    this.name = data.name;
    this.nickname = data.nickname;
    this.type = data.type;
  }

  async login(password: string): Promise<boolean> {
    return this.passwordService.validatePassword(password, this.password);
  }
}
