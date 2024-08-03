import { ExceptionBase } from 'app/lib/exceptions/exception.base';
import { INVALID_BEARER_TOKEN } from 'app/lib/exceptions/exception.codes';

export class InvalidBearerTokenException extends ExceptionBase {
  public constructor(errors: string[]) {
    super('invalid bearer token', INVALID_BEARER_TOKEN, errors, true);
  }
}
