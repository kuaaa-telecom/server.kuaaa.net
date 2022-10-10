import { ClassProvider, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BcryptPasswordService } from './account/bcrypt.password.service';
import { AuthController } from './auth.controller';
import { AccountFactory } from './account/account.factory';
import { AccountRepository } from './account/account.repository';

const passwordService: ClassProvider = {
  provide: 'IPasswordService',
  useClass: BcryptPasswordService,
};

const accountRepository: ClassProvider = {
  provide: 'IAccountRepository',
  useClass: AccountRepository,
};

@Module({
  providers: [AuthService, passwordService, AccountFactory, accountRepository],
  controllers: [AuthController],
})
export class AuthModule {}
