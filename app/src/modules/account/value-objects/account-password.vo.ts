import { ValidationException } from 'app/lib/exceptions/validation.exception';

export class AccountPasswordVo {
  private password: string;

  public constructor(password: string) {
    this.set_password(password);
  }

  public get_password(): string {
    return this.password;
  }

  private set_password(param: string): void {
    if (param.length === 0) {
      throw new ValidationException(['password cannot be empty']);
    }

    return void (this.password = param);
  }
}
