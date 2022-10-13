import { MemberType } from '@prisma/client';
import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../guard/role.gard';

export const Roles = (...roles: MemberType[]) => SetMetadata(ROLES_KEY, roles);
