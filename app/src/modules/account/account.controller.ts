import { Controller } from '@nestjs/common';

import { AccountService } from 'app/modules/account/account.service';

@Controller('account')
export class AccountController {
  private account_service: AccountService;

  public constructor(account_service: AccountService) {
    this.account_service = account_service;
  }
}
