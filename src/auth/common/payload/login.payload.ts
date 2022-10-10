import { IsDefined, IsString, Length, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginPayload {
  @IsDefined()
  @Length(10, 10)
  @IsString()
  @ApiProperty({ type: String, description: '학번' })
  studentId!: string;

  @IsDefined()
  @MinLength(1)
  @IsString()
  @ApiProperty({ type: String, description: '비밀번호' })
  password!: string;
}
