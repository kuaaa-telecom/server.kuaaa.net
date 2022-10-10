import { AccountDomainData } from './type/account-domain-data.type';

export class AccountDomain {
  memberId!: string;
  studentId!: string;
  password!: string;
  name!: string;
  nickname!: string;

  constructor(data: AccountDomainData) {
    this.memberId = data.memberId;
    this.studentId = data.studentId;
    this.password = data.password;
    this.name = data.name;
    this.nickname = data.nickname;
  }

  async login(password: string): Promise<boolean> {
    // 비밀번호 비교, 받아온 암호화 서비스에 위탁
    return true;
  }
}
