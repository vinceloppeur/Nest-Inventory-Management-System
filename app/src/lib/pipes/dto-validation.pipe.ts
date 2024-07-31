import { Injectable, type PipeTransform } from '@nestjs/common';
import { type ZodIssue, type SafeParseReturnType, type ZodSchema } from 'zod';

import { ValidationException } from 'app/lib/exceptions/validation.exception';

@Injectable()
export class DtoValidationPipe implements PipeTransform {
  private schema: ZodSchema;

  public constructor(schema: ZodSchema) {
    this.schema = schema;
  }

  public transform(value: unknown): unknown {
    const validation: SafeParseReturnType<unknown, unknown> =
      this.schema.safeParse(value);

    if (validation.error) {
      const errors: string[] = validation.error.issues.map(
        (issue: ZodIssue): string => issue.message,
      );

      throw new ValidationException(errors);
    }

    return value;
  }
}
