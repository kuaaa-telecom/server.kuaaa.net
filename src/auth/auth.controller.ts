import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { TokenDto } from './common/dto/token.dto';
import { LoginPayload } from './common/payload/login.payload';
import { SignupPayload } from './common/payload/signup.payload';

@ApiTags('Auth API')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiOperation({ summary: '계정을 생성합니다.' })
  @ApiCreatedResponse({ type: TokenDto })
  async signUp(@Body() payload: SignupPayload): Promise<TokenDto> {
    return this.authService.signUp(payload);
  }

  @Post('login')
  @ApiOperation({ summary: '로그인합니다.' })
  @ApiOkResponse({ type: TokenDto })
  async login(@Body() payload: LoginPayload): Promise<TokenDto> {
    return this.authService.login(payload);
  }
}
