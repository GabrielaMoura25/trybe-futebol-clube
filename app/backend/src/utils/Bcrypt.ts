import * as bcrypt from 'bcryptjs';

export default class BcryptService {
  private static salt = 10;

  public static encrypt(text: string): string {
    return bcrypt.hashSync(text, this.salt);
  }

  public static compare(planText: string, encryptText: string): boolean {
    return bcrypt.compareSync(planText, encryptText);
  }
}
