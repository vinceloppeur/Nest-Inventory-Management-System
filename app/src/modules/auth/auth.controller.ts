import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from 'app/modules/auth/auth.service';
import { DtoValidationPipe } from 'app/lib/pipes/dto-validation.pipe';
import {
  SignUpRequestSchema,
  type SignUpRequestDto,
  type SignUpResponseDto,
} from 'app/modules/auth/dtos/sign-up.dto';
import { type ApiResponse } from 'app/lib/apis/api-response';

@Controller('auth')
export class AuthController {
  private auth_service: AuthService;

  public constructor(auth_service: AuthService) {
    this.auth_service = auth_service;
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  public async sign_up(
    @Body(new DtoValidationPipe(SignUpRequestSchema)) body: SignUpRequestDto,
  ): Promise<ApiResponse<SignUpResponseDto>> {
    const created_account: SignUpResponseDto =
      await this.auth_service.sign_up(body);

    return {
      message: 'succesfully signed-up, please login into your new account',
      data: created_account,
      status: HttpStatus.CREATED,
    };
  }
}
