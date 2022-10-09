import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateMemberPayload {
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
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @ApiProperty({ description: '가입일자' })
  registeredAt!: Date;

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

export class CreateMembersPayload {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty({ description: '등록 멤버 list' })
  members!: CreateMemberPayload[];
}
