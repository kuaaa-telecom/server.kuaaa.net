import { ApiProperty } from '@nestjs/swagger';
import { Member } from '../../member/member.entity';
import { Major } from '../../member/major.entity';

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
  registeredAt!: string;

  @ApiProperty({ type: Number })
  generation!: number;

  @ApiProperty({ type: String, nullable: true })
  email!: string | null;

  @ApiProperty({ type: String, nullable: true })
  phone!: string | null;

  @ApiProperty({ type: String, nullable: true })
  address!: string | null;

  @ApiProperty({ type: String, nullable: true })
  nickname!: string | null;

  @ApiProperty({ type: MajorInfoDto })
  major!: MajorInfoDto;

  static async of(member: Member): Promise<MemberInfoDto> {
    const major: Major = await member.getMajor();
    return {
      name: member.name,
      studentId: member.studentId,
      registeredAt: member.registeredAt.toISOString().split('T')[0],
      generation: member.generation,
      email: member.email,
      phone: member.phone,
      address: member.address,
      nickname: member.nickname,
      major: {
        name: major.name,
        college: major.college,
      },
    };
  }
}
