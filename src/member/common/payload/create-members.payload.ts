import {
  IsArray,
  IsDate,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
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
}

export class CreateMembersPayload {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMemberPayload)
  @ApiProperty({ type: [CreateMemberPayload] })
  members!: CreateMemberPayload[];
}
