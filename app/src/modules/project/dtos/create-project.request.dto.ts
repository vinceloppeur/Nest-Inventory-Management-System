import { z } from 'zod';

export const create_project = z.object({
  name: z.string({
    required_error: 'project name cannot be empty',
    invalid_type_error: 'project name must be a string',
  }),
});

export type CreateProjectDto = z.infer<typeof create_project>;
