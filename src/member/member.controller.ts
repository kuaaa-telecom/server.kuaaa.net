import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MemberService } from './member.service';

@ApiTags('Member API')
@Controller('api/members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}
}
