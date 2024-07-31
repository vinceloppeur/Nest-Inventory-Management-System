import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { type Response } from 'express';

import { AuthService } from 'app/modules/auth/auth.service';
import { DtoValidationPipe } from 'app/lib/pipes/dto-validation.pipe';
import {
  SignUpSchema,
  type SignUpRequestDto,
  type SignUpResponseDto,
} from 'app/modules/auth/dtos/sign-up.dto';
import { type ApiResponse } from 'app/lib/apis/api-response';
import {
  LoginResponseDto,
  LoginSchema,
  type LoginRequestDto,
} from 'app/modules/auth/dtos/login.dto';

@Controller('auth')
export class AuthController {
  private auth_service: AuthService;

  public constructor(auth_service: AuthService) {
    this.auth_service = auth_service;
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  public async sign_up(
    @Body(new DtoValidationPipe(SignUpSchema)) body: SignUpRequestDto,
  ): Promise<ApiResponse<SignUpResponseDto>> {
    const created_account: SignUpResponseDto =
      await this.auth_service.sign_up(body);

    return {
      message: 'succesfully signed-up, please login into your new account',
      data: created_account,
      status: HttpStatus.CREATED,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(
    @Body(new DtoValidationPipe(LoginSchema)) body: LoginRequestDto,
    @Res() res: Response,
  ): Promise<ApiResponse<void>> {
    const token: LoginResponseDto = await this.auth_service.login(body);

    res.cookie('atk', token, { httpOnly: true }).json({
      message: 'successfully logged in',
      status: HttpStatus.OK,
    });

    return {
      message: 'successfully logged in',
      status: HttpStatus.OK,
    };
  }
}
