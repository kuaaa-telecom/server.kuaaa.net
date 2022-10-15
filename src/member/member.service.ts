import { Injectable } from '@nestjs/common';
import { MemberFactory } from './member/member.factory';

@Injectable()
export class MemberService {
  constructor(private readonly memberFactory: MemberFactory) {}
}
