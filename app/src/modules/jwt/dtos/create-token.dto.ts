export type CreateTokenRequestDto = {
  payload: Record<string, unknown>;
  expires_in: number;
  not_before_time?: number;
};

export type CreateTokenResponseDto = string;
