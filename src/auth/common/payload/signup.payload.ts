import { IsDefined, IsString, Length, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupPayload {
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

  @IsDefined()
  @MinLength(1)
  @IsString()
  @ApiProperty({ type: String, description: '이름' })
  name!: string;

  @IsDefined()
  @MinLength(1)
  @IsString()
  @ApiProperty({ type: String, description: '닉네임' })
  nickname!: string;
}
