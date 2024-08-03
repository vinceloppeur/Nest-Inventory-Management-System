import { ExceptionBase } from 'app/lib/exceptions/exception.base';
import { UNAUTHENTICATED } from 'app/lib/exceptions/exception.codes';

export class UnauthenticatedException extends ExceptionBase {
  public constructor(errors: string[]) {
    super('not authenticated', UNAUTHENTICATED, errors, true);
  }
}
