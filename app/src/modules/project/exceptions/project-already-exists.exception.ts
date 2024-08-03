import { ExceptionBase } from 'app/lib/exceptions/exception.base';
import { PROJECT_ALREADY_EXISTS } from 'app/lib/exceptions/exception.codes';

export class ProjectAlreadyExistsException extends ExceptionBase {
  public constructor(errors: string[]) {
    super('project already exists', PROJECT_ALREADY_EXISTS, errors, true);
  }
}
