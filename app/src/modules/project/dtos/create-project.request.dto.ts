import { type CreateProjectValidation } from 'app/modules/project/validations/create-project.validation';

export type CreateProjectDto = CreateProjectValidation & {
  user_id: string;
};
