import {
  IsArray,
  IsDate,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class CreateMemberPayload {
  @IsDefined()
  @MinLength(1)
  @IsString()
  @ApiProperty({ description: '이름', type: String })
  name!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '학번', type: String })
  studentId!: string;

  @IsDefined()
  @IsInt()
  @ApiProperty({ description: '전공ID', type: Number })
  majorId!: number;

  @IsDefined()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @ApiProperty({ description: '가입일자', type: String, example: '2021-01-01' })
  registeredAt!: Date;

  @IsOptional()
  @MinLength(1)
  @IsString()
  @ApiPropertyOptional({ description: '이메일', nullable: true, type: String })
  email?: string | null;

  @IsOptional()
  @MinLength(1)
  @IsString()
  @ApiPropertyOptional({
    description: '전화번호',
    nullable: true,
    type: String,
  })
  phone?: string | null;

  @IsOptional()
  @MinLength(1)
  @IsString()
  @ApiPropertyOptional({ description: '주소', nullable: true, type: String })
  address?: string | null;
}

export class CreateMembersPayload {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMemberPayload)
  @ApiProperty({ type: [CreateMemberPayload] })
  members!: CreateMemberPayload[];
}
