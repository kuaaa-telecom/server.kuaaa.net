import {
  IsDate,
  IsEnum,
  IsInt,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { MemberType } from '@prisma/client';

export class UpdateMemberByAdminPayload {
  @MinLength(1)
  @IsString()
  @ApiPropertyOptional({ description: '이름', type: String })
  name?: string;

  @Length(10, 10)
  @IsString()
  @ApiPropertyOptional({ description: '학번', type: String })
  studentId?: string;

  @IsInt()
  @ApiPropertyOptional({ description: '전공ID', type: Number })
  majorId?: number;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @ApiPropertyOptional({
    description: '가입일자',
    type: String,
    example: '2021-01-01',
  })
  registeredAt?: Date;

  @IsEnum(MemberType)
  @ApiPropertyOptional({
    description: '회원권한',
    type: String,
    enum: MemberType,
  })
  type?: MemberType;
}
