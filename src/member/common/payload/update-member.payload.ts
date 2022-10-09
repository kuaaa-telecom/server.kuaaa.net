import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMemberPayload {
  @IsString()
  @ApiPropertyOptional({ description: '이름' })
  name?: string;

  @IsString()
  @ApiPropertyOptional({ description: '학번' })
  studentId?: string;

  @IsInt()
  @ApiPropertyOptional({ description: '전공ID' })
  majorId?: number;

  @IsDateString()
  @ApiPropertyOptional({ description: '가입일자' })
  registeredAt?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: '이메일', nullable: true })
  email?: string | null;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: '전화번호', nullable: true })
  phone?: string | null;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: '주소', nullable: true })
  address?: string | null;
}
