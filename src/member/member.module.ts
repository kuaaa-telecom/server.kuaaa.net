import { ClassProvider, Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { MemberFactory } from './member/member.factory';
import { MemberRepository } from './member/member.repository';

const customMemberRepository: ClassProvider = {
  provide: 'IMemberRepository',
  useClass: MemberRepository,
};

@Module({
  providers: [MemberService, MemberFactory, customMemberRepository],
  controllers: [MemberController],
})
export class MemberModule {}
