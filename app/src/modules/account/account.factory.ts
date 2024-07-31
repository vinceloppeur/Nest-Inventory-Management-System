import { Injectable } from '@nestjs/common';

import { AccountUidVo } from 'app/modules/account/value-objects/account-uid.vo';
import { EmailAddressVo } from 'app/modules/account/value-objects/email-address.vo';
import { AccountUsernameVo } from 'app/modules/account/value-objects/account-username.vo';
import { AccountPasswordVo } from 'app/modules/account/value-objects/account-password.vo';
import { AccountEntity } from 'app/modules/account/account.entity';

export interface AccountFactoryToDomainStruct {
  account_uid: string;
  email_address: string;
  account_username: string;
  account_password: string;
  created_at?: string;
}

/**
 * @public
 * @class
 * a factory class to instantiate account domain object, which, only has one
 * public method for creating the domain object.
 *
 * you might not want to instantiate the value objects and the account domain
 * object manually across the application. Therefore, use this class whenever
 * an account domain object needs to be instantiated.
 */
@Injectable()
export class AccountFactory {
  public constructor() {}

  /**
   * @public
   * @param {AccountFactoryToDomainStruct} struct
   * @returns {AccountEntity}
   */
  public create(struct: AccountFactoryToDomainStruct): AccountEntity {
    return new AccountEntity(
      new AccountUidVo(struct.account_uid),
      new EmailAddressVo(struct.email_address),
      new AccountUsernameVo(struct.account_username),
      new AccountPasswordVo(struct.account_password),
      struct.created_at ? new Date(struct.created_at) : new Date(),
    );
  }
}
