import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MemberService } from './member.service';
import { JwtAuthGuard } from '../auth/common/guard/jwt-auth.guard';
import { CurrentAccount } from '../auth/common/decorator/member.decorator';
import { Account } from '../auth/account/account.entity';
import { MemberInfoDto } from './common/dto/member-info.dto';

@ApiTags('Member API')
@Controller('api/members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('member')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '본인의 회원정보를 확인합니다.' })
  @ApiOkResponse({ type: MemberInfoDto })
  async getMember(@CurrentAccount() account: Account): Promise<MemberInfoDto> {
    return this.memberService.getMember(account);
  }
}
