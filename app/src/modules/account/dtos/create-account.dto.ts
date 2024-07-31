import { z } from 'zod';

export const CreateAccountSchema = z.object({
  email: z.string({
    required_error: 'email cannot be empty',
    invalid_type_error: 'email must be a string',
  }),
  username: z.string({
    required_error: 'username cannot be empty',
    invalid_type_error: 'username must be a string',
  }),
  password: z.string({
    required_error: 'password cannot be empty',
    invalid_type_error: 'password must be a string',
  }),
});

export type CreateAccountRequestDto = z.infer<typeof CreateAccountSchema>;

export type CreateAccountResponseDto = {
  uid: string;
  email: string;
  username: string;
  createdAt: Date;
};
