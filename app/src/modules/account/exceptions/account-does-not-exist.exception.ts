import { ExceptionBase } from 'app/lib/exceptions/exception.base';
import { ACCOUNT_DOES_NOT_EXIST } from 'app/lib/exceptions/exception.codes';

export class AccountDoesNotExistException extends ExceptionBase {
  public static readonly message: string = 'account does not exist';

  public constructor(errors: string[]) {
    super(
      AccountDoesNotExistException.message,
      ACCOUNT_DOES_NOT_EXIST,
      errors,
      true,
    );
  }
}
