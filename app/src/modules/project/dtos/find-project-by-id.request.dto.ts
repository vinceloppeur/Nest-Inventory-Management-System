import { z } from 'zod';

export const find_project_by_id = z.string({
  required_error: 'cannot find project with empty id',
  invalid_type_error: 'project id must be a string',
});

export type FindProjectByIdDto = z.infer<typeof find_project_by_id>;
