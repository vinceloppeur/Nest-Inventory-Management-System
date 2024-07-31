import {
  CreateAccountRequestSchema,
  type CreateAccountRequestDto,
  type CreateAccountResponseDto,
} from 'app/modules/account/dtos/create-account.dto';

export const SignUpRequestSchema = CreateAccountRequestSchema;

export type SignUpRequestDto = CreateAccountRequestDto;

export type SignUpResponseDto = CreateAccountResponseDto;
