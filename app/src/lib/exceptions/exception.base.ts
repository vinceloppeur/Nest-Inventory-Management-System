/**
 * @public
 * @class
 * a base class for custom errors/exceptions.
 *
 * every custom exceptions must extend from this
 */
export class ExceptionBase extends Error {
  public expose: boolean = true;
  public errors?: string[];
  public code: string;

  /**
   * @constructor
   * @param {string} message
   * @param {string} code
   * @param {string[]} errors the underlying issues that caused the error or the
   * exception
   * @param {boolean} expose
   */
  public constructor(
    message: string,
    code: string,
    errors?: string[],
    expose: boolean = true,
  ) {
    super(message);

    this.code = code;
    this.expose = expose;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}
