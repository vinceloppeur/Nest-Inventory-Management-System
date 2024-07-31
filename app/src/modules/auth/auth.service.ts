import { Injectable } from '@nestjs/common';

import {
  type SignUpResponseDto,
  type SignUpRequestDto,
} from 'app/modules/auth/dtos/sign-up.dto';
import { AccountService } from 'app/modules/account/account.service';
import {
  type LoginResponseDto,
  type LoginRequestDto,
} from 'app/modules/auth/dtos/login.dto';
import { type GetAccountInfoByEmailResponseDto } from 'app/modules/account/dtos/get-account-by-email.dto';
import { JwtService } from 'app/modules/jwt/jwt.service';

@Injectable()
export class AuthService {
  private account_service: AccountService;
  private jwt_service: JwtService;

  public constructor(account_service: AccountService, jwt_service: JwtService) {
    this.account_service = account_service;
    this.jwt_service = jwt_service;
  }

  public async sign_up(request: SignUpRequestDto): Promise<SignUpResponseDto> {
    return this.account_service.create_account(request);
  }

  public async login(request: LoginRequestDto): Promise<LoginResponseDto> {
    const account: GetAccountInfoByEmailResponseDto =
      await this.account_service.find_account_by_email({
        email: request.email,
      });

    /**
     * client will be logged into this account for 15 minutes from now
     */
    const logged_until: number = 15 * 60;

    const token: string = this.jwt_service.create_token({
      payload: {
        uid: account.uid,
        email: account.email,
        createdAt: account.createdAt,
      },
      expires_in: logged_until,
    });

    return token;
  }
}
