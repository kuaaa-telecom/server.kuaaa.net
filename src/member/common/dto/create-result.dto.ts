import { ApiProperty } from '@nestjs/swagger';

export class CreateResultDto {
  @ApiProperty({ description: '등록된 member들의 Id List' })
  memberIds!: string[];
}
