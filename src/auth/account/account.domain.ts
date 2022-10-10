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
}
