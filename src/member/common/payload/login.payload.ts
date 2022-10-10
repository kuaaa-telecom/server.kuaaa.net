import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginPayload {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: '학번' })
  studentId!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: '비밀번호' })
  password!: string;
}
