import { z } from 'zod';

export const GetAccountInfoByEmailSchema = z.object({
  email: z.string({
    required_error: 'email cannot be empty',
    invalid_type_error: 'email must be a string',
  }),
});

export type GetAccountInfoByEmailRequestDto = z.infer<
  typeof GetAccountInfoByEmailSchema
>;

export type GetAccountInfoByEmailResponseDto = {
  uid: string;
  email: string;
  username: string;
  password: string;
  createdAt: string;
};
