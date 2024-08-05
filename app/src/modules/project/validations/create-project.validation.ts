import { z } from 'zod';

export const CreateProjectValidation = z.object({
  name: z.string({
    required_error: 'project name cannot be empty',
    invalid_type_error: 'project name must be a string',
  }),
});

export type CreateProjectValidation = z.infer<typeof CreateProjectValidation>;
