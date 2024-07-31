import {
  type ArgumentsHost,
  Catch,
  HttpStatus,
  type ExceptionFilter,
} from '@nestjs/common';
import { type AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { type HttpArgumentsHost } from '@nestjs/common/interfaces';

import { ExceptionBase } from 'app/lib/exceptions/exception.base';
import { type ApiErrorResponse } from 'app/lib/apis/api-error-response';

@Catch(ExceptionBase)
export class ExceptionBaseFilter implements ExceptionFilter {
  private http_adapter_host: HttpAdapterHost;

  public constructor(http_adapter_host: HttpAdapterHost) {
    this.http_adapter_host = http_adapter_host;
  }

  public catch(exception: ExceptionBase, host: ArgumentsHost): void {
    const http_adapter: AbstractHttpAdapter<unknown, unknown, unknown> =
      this.http_adapter_host.httpAdapter;

    const ctx: HttpArgumentsHost = host.switchToHttp();

    const response: ApiErrorResponse = {
      /**
       * TODO: use `interceptor` instead of creating `Date` instance here. It's
       * really bad and inaccurate since the date/time of the request might or is
       * not exactly the time where the request is sent.
       *
       * {@link https://docs.nestjs.com/interceptors}
       */
      requestedAt: new Date(),
      error: {
        message: exception.message,
        issues: exception.errors,
      },
      status: HttpStatus.BAD_REQUEST,
      code: exception.code,
    };

    return void http_adapter.reply(
      ctx.getResponse(),
      response,
      response.status,
    );
  }
}
