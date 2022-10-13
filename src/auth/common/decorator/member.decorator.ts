import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Account } from '../../account/account.entity';

export const CurrentMember = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Account => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
