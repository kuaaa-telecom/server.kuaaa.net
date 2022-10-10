import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupPayload } from './common/payload/signup.payload';
import { TokenDto } from './common/dto/token.dto';
import { LoginPayload } from './common/payload/login.payload';
import { AccountFactory } from './account/account.factory';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AccountDomain } from './account/account.domain';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountFactory: AccountFactory,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(payload: SignupPayload): Promise<TokenDto> {
    const account: AccountDomain = await this.accountFactory.createAccount(
      payload,
    );
    const token = await this.createAccessToken(account.memberId);
    return { accessToken: token };
  }

  async login(payload: LoginPayload): Promise<TokenDto> {
    const account: AccountDomain =
      await this.accountFactory.getAccountByStudentId(payload.studentId);

    const loginResult = await account.login(payload.password);
    if (!loginResult) {
      throw new UnauthorizedException('학번과 비밀번호가 일치하지 않습니다.');
    }

    const token = await this.createAccessToken(account.memberId);
    return { accessToken: token };
  }

  async createAccessToken(memberId: string): Promise<string> {
    return this.jwtService.sign(
      { id: memberId },
      {
        secret: this.config.get('JWT_ACCESS_TOKEN_KEY'),
        expiresIn: this.config.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      },
    );
  }
}
