import { compare, genSalt, hash } from 'bcryptjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptPasswordService implements IPasswordService {
  async getEncryptPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}
