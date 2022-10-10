import { Injectable } from '@nestjs/common';
import { SignupPayload } from './common/payload/signup.payload';
import { TokenDto } from './common/dto/token.dto';
import { LoginPayload } from './common/payload/login.payload';

@Injectable()
export class AuthService {
  constructor() {}

  async signUp(payload: SignupPayload): Promise<TokenDto> {
    return {} as any;
  }

  async login(payload: LoginPayload): Promise<TokenDto> {
    return {} as any;
  }
}
