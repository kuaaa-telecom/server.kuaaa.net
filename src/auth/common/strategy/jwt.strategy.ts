import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AccountDomain } from '../../account/account.domain';
import { AccountFactory } from '../../account/account.factory';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly accountFactory: AccountFactory,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_ACCESS_TOKEN_KEY'),
    });
  }

  async validate({ id }: { id: string }): Promise<AccountDomain> {
    const member: AccountDomain | null =
      await this.accountFactory.getAccountByMemberId(id);

    if (!member) {
      throw new UnauthorizedException();
    }
    return member;
  }
}
