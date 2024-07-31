import { ExceptionBase } from 'app/lib/exceptions/exception.base';
import { ACCOUNT_ALREADY_EXISTS } from 'app/lib/exceptions/exception.codes';

export class AccountAlreadyExistsException extends ExceptionBase {
  public static readonly message: string = 'account already exists';

  public constructor(errors: string[]) {
    super(
      AccountAlreadyExistsException.message,
      ACCOUNT_ALREADY_EXISTS,
      errors,
      true,
    );
  }
}
