import { ValidationException } from 'app/lib/exceptions/validation.exception';

export class AccountUsernameVo {
  private username: string;

  public constructor(username: string) {
    this.set_username(username);
  }

  public get_username(): string {
    return this.username;
  }

  private set_username(param: string): void {
    const errors: string[] = [];

    if (param.length > 64) {
      errors.push('account username cannot be longer than 64 characters');
    }

    if (param.length < 4) {
      errors.push('account username should be at least 4 characters');
    }

    if (errors.length > 0) {
      throw new ValidationException(errors);
    }

    return void (this.username = param);
  }
}
