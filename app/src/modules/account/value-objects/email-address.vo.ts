import { Validator } from 'app/lib/utils/validator';
import { ValidationException } from 'app/lib/exceptions/validation.exception';

export class EmailAddressVo {
  private email: string;

  public constructor(email: string) {
    this.set_email(email);
  }

  public get_email(): string {
    return this.email;
  }

  private set_email(param: string): void {
    if (Validator.is_email(param) === false) {
      throw new ValidationException(['invalid email address']);
    }

    return void (this.email = param);
  }
}
