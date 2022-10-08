import {
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class MemberPayload {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '이름' })
  name!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '학번' })
  studentId!: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ description: '전공ID' })
  majorId!: number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ description: '가입일자' })
  registeredAt!: string;

  @IsString()
  @ApiPropertyOptional({ description: '이메일', nullable: true })
  email?: string | null;

  @IsString()
  @ApiPropertyOptional({ description: '전화번호', nullable: true })
  phone?: string | null;

  @IsString()
  @ApiPropertyOptional({ description: '주소', nullable: true })
  address?: string | null;
}

export class CreateMembersPayload {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty({ description: '등록 멤버 list' })
  members!: MemberPayload[];
}
