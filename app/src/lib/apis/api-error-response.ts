export interface ApiErrorResponse {
  error: {
    /**
     * @public
     * a short and concise message to the client about the request, that an
     * unexpected or expected error/exception occurs.
     *
     * for instance, an exception that is thrown after the server has checked
     * that a value sent by the client is invalid.
     */
    message: string;
    /**
     * @public
     * the issues that caused the error/exception to be fixed by the client, or
     * `undefined` if it's an internal server error which should be handled from
     * the server-side.
     */
    issues?: string[];
  };
  /**
   * @public
   * the date/time which the request is sent by the client.
   */
  requestedAt: Date;
  /**
   * @public
   * the status code response of the request (`4xx`-`5xx`). See
   * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status}.
   */
  status: number;
  code: string;
}
