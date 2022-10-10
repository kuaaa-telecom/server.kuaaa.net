import { Injectable } from '@nestjs/common';
import { SignupPayload } from './common/payload/signup.payload';
import { TokenDto } from './common/dto/token.dto';
import { LoginPayload } from './common/payload/login.payload';
import { AccountFactory } from './account/account.factory';

@Injectable()
export class AuthService {
  constructor(private readonly accountFactory: AccountFactory) {}

  async signUp(payload: SignupPayload): Promise<TokenDto> {
    const account = await this.accountFactory.createAccount(payload);
    return {} as any;
  }

  async login(payload: LoginPayload): Promise<TokenDto> {
    const account = await this.accountFactory.getAccountByStudentId(
      payload.studentId,
    );
    return {} as any;
  }
}
