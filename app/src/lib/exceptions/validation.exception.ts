import { ExceptionBase } from 'app/lib/exceptions/exception.base';
import { INVALID_PARAMETERS } from 'app/lib/exceptions/exception.codes';

export class ValidationException extends ExceptionBase {
  public static readonly message: string = 'invalid parameters';

  public override name: string = 'ValidationException';

  public constructor(errors: string[]) {
    super(ValidationException.message, INVALID_PARAMETERS, errors, true);
  }
}
