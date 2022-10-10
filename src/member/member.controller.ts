import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MemberService } from './member.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateResultDto } from './common/dto/create-result.dto';
import { CreateMembersPayload } from './common/payload/create-members.payload';
import { UpdateMemberPayload } from './common/payload/update-member.payload';
import { JwtAuthGuard } from '../auth/common/guard/jwt-auth.guard';

@ApiTags('Member API')
@Controller('api/members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '회원 명부에 여러 회원들을 등록합니다.' })
  @ApiCreatedResponse({ type: CreateResultDto })
  async createMembers(
    @Body() payload: CreateMembersPayload,
  ): Promise<CreateResultDto> {
    return this.memberService.createMembers(payload);
  }

  @Patch(':memberId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '해당 회원의 정보를 수정합니다.' })
  @ApiParam({ name: 'memberId', type: 'string' })
  @ApiNoContentResponse()
  async updateMember(
    @Param('memberId', ParseUUIDPipe) id: string,
    @Body() payload: UpdateMemberPayload,
  ): Promise<void> {
    await this.memberService.updateMember(id, payload);
  }

  @Delete(':memberId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '해당 회원의 정보를 삭제합니다.' })
  @ApiParam({ name: 'memberId', type: 'string', format: 'uuid' })
  @ApiNoContentResponse()
  async deleteMember(
    @Param('memberId', ParseUUIDPipe) id: string,
  ): Promise<void> {
    await this.memberService.deleteMember(id);
  }
}
