import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMemberPayload {
  @MinLength(1)
  @IsString()
  @ApiPropertyOptional({ description: '닉네임', type: String })
  nickname?: string;

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
