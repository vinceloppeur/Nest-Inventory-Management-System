import { ExceptionBase } from 'app/lib/exceptions/exception.base';
import { PROJECT_DOES_NOT_EXIST } from 'app/lib/exceptions/exception.codes';

export class ProjectDoesNotExistException extends ExceptionBase {
  public constructor(errors: string[]) {
    super('project does not exist', PROJECT_DOES_NOT_EXIST, errors, true);
  }
}
