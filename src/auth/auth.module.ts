import { ClassProvider, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BcryptPasswordService } from './account/bcrypt.password.service';
import { AuthController } from './auth.controller';
import { AccountFactory } from './account/account.factory';

const passwordService: ClassProvider = {
  provide: 'IPasswordService',
  useClass: BcryptPasswordService,
};

@Module({
  providers: [AuthService, passwordService, AccountFactory],
  controllers: [AuthController],
})
export class AuthModule {}
