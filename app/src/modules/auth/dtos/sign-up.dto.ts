import {
  CreateAccountSchema,
  type CreateAccountRequestDto,
  type CreateAccountResponseDto,
} from 'app/modules/account/dtos/create-account.dto';

export const SignUpSchema = CreateAccountSchema;

export type SignUpRequestDto = CreateAccountRequestDto;

export type SignUpResponseDto = CreateAccountResponseDto;
