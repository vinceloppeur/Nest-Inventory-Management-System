import { Injectable } from '@nestjs/common';

import {
  type SignUpResponseDto,
  type SignUpRequestDto,
} from 'app/modules/auth/dtos/sign-up.dto';
import { AccountService } from 'app/modules/account/account.service';

@Injectable()
export class AuthService {
  private account_service: AccountService;

  public constructor(account_service: AccountService) {
    this.account_service = account_service;
  }

  public async sign_up(request: SignUpRequestDto): Promise<SignUpResponseDto> {
    return this.account_service.create_account(request);
  }
}
