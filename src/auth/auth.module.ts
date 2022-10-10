import { ClassProvider, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BcryptPasswordService } from './account/bcrypt.password.service';
import { AuthController } from './auth.controller';
import { AccountFactory } from './account/account.factory';
import { AccountRepository } from './account/account.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const passwordService: ClassProvider = {
  provide: 'IPasswordService',
  useClass: BcryptPasswordService,
};

const accountRepository: ClassProvider = {
  provide: 'IAccountRepository',
  useClass: AccountRepository,
};

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_KEY'),
        signOptions: {
          expiresIn: `${configService.get(
            'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
          )}s`,
        },
      }),
    }),
  ],
  providers: [AuthService, passwordService, AccountFactory, accountRepository],
  controllers: [AuthController],
})
export class AuthModule {}
