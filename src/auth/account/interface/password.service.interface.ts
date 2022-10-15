interface IPasswordService {
  getEncryptPassword(password: string): Promise<string>;
  validatePassword(password: string, hashedPassword: string): Promise<boolean>;
}
