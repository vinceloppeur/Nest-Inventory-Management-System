import { type CreateTokenResponseDto } from 'app/modules/jwt/dtos/create-token.dto';
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string({
    required_error: 'email cannot be empty',
    invalid_type_error: 'email must be a string',
  }),
  password: z.string({
    required_error: 'password cannot be empty',
    invalid_type_error: 'password must be a string',
  }),
});

export type LoginRequestDto = z.infer<typeof LoginSchema>;

export type LoginResponseDto = CreateTokenResponseDto;
