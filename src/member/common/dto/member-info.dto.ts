import { ApiProperty } from '@nestjs/swagger';

class MajorInfoDto {
  @ApiProperty({ type: String })
  name!: string;

  @ApiProperty({ type: String })
  college!: string;
}

export class MemberInfoDto {
  @ApiProperty({ type: String })
  name!: string;

  @ApiProperty({ type: String })
  studentId!: string;

  @ApiProperty({ type: String })
  registeredAt!: Date;

  @ApiProperty({ type: Number })
  generation!: number;

  @ApiProperty({ type: String, nullable: true })
  email!: string | null;

  @ApiProperty({ type: String, nullable: true })
  phone!: string | null;

  @ApiProperty({ type: String, nullable: true })
  address!: string | null;

  @ApiProperty({ type: MajorInfoDto })
  major!: MajorInfoDto;
}
