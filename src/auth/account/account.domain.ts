import { AccountDomainData } from './type/account-domain-data.type';

export class AccountDomain {
  memberId!: string;
  studentId!: string;
  password!: string;
  name!: string;
  nickname!: string;

  constructor(
    private readonly passwordService: IPasswordService,
    data: AccountDomainData,
  ) {
    this.memberId = data.memberId;
    this.studentId = data.studentId;
    this.password = data.password;
    this.name = data.name;
    this.nickname = data.nickname;
  }

  async login(password: string): Promise<boolean> {
    return this.passwordService.validatePassword(password, this.password);
  }
}
