import { ClassProvider, Module } from '@nestjs/common';
import { MemberAdminService } from './member.admin.service';
import { MemberAdminController } from './member.admin.controller';
import { MemberFactory } from './member/member.factory';
import { MemberRepository } from './member/member.repository';

const memberRepository: ClassProvider = {
  provide: 'IMemberRepository',
  useClass: MemberRepository,
};

@Module({
  providers: [MemberAdminService, MemberFactory, memberRepository],
  controllers: [MemberAdminController],
})
export class MemberModule {}
