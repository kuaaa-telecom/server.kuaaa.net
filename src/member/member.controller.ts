import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MemberService } from './member.service';
import { JwtAuthGuard } from '../auth/common/guard/jwt-auth.guard';
import { CurrentAccount } from '../auth/common/decorator/member.decorator';
import { Account } from '../auth/account/account.entity';
import { MemberInfoDto } from './common/dto/member-info.dto';
import { UpdateMemberPayload } from './common/payload/update-member.payload';

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

  @Patch('member')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '본인의 회원정보를 수정합니다.' })
  @ApiNoContentResponse()
  async updateMember(
    @CurrentAccount() account: Account,
    @Body() payload: UpdateMemberPayload,
  ): Promise<void> {
    return this.memberService.updateMember(account, payload);
  }
}
