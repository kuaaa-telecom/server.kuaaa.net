import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MemberType } from '@prisma/client';

export const ROLES_KEY = 'roles';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<MemberType[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!roles) return true;

    const { user: account } = context.switchToHttp().getRequest();

    return this.matchRoles(roles, account.type);
  }

  matchRoles(roles: MemberType[], userRole: MemberType) {
    console.log(roles, userRole);
    return roles.some((role) => role === userRole);
  }
}
