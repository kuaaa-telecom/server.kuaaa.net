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
import { Transform, Type } from 'class-transformer';

export class CreateMemberPayload {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '이름', type: String })
  name!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '학번', type: String })
  studentId!: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ description: '전공ID', type: Number })
  majorId!: number;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @ApiProperty({ description: '가입일자', type: String, example: '2021-01-01' })
  registeredAt!: Date;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: '이메일', nullable: true, type: String })
  email?: string | null;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '전화번호',
    nullable: true,
    type: String,
  })
  phone?: string | null;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: '주소', nullable: true, type: String })
  address?: string | null;
}

export class CreateMembersPayload {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMemberPayload)
  @ApiProperty({ type: [CreateMemberPayload] })
  members!: CreateMemberPayload[];
}
