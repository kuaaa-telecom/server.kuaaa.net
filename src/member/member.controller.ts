import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { MemberService } from './member.service';
import {
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateResultDto } from './dto/create-result.dto';
import { CreateMembersPayload } from './payload/create-members.payload';
import { UpdateMemberPayload } from './payload/update-member.payload';

@ApiTags('Member API')
@Controller('api/members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @ApiOperation({ summary: '회원 명부에 여러 회원들을 등록합니다.' })
  @ApiOkResponse({ type: CreateResultDto })
  async createMembers(
    @Body() payload: CreateMembersPayload,
  ): Promise<CreateResultDto> {
    return this.memberService.createMembers(payload);
  }

  @Patch(':id')
  @ApiOperation({ summary: '해당 회원의 정보를 수정합니다.' })
  @ApiNoContentResponse()
  async updateMember(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateMemberPayload,
  ): Promise<void> {
    await this.memberService.updateMember(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: '해당 회원의 정보를 삭제합니다.' })
  @ApiNoContentResponse()
  async deleteMember(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.memberService.deleteMember(id);
  }
}
