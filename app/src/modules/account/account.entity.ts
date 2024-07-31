import type { AccountUidVo } from 'app/modules/account/value-objects/account-uid.vo';
import type { EmailAddressVo } from 'app/modules/account/value-objects/email-address.vo';
import type { AccountUsernameVo } from 'app/modules/account/value-objects/account-username.vo';
import type { AccountPasswordVo } from 'app/modules/account/value-objects/account-password.vo';

export class AccountEntity {
  private account_uid: AccountUidVo;
  private email_address: EmailAddressVo;
  private account_username: AccountUsernameVo;
  private account_password: AccountPasswordVo;
  private created_at: Date;

  public constructor(
    account_uid: AccountUidVo,
    email_address: EmailAddressVo,
    account_username: AccountUsernameVo,
    account_password: AccountPasswordVo,
    created_at: Date,
  ) {
    this.account_uid = account_uid;
    this.email_address = email_address;
    this.account_username = account_username;
    this.account_password = account_password;
    this.created_at = created_at;
  }

  public get_uid(): string {
    return this.account_uid.get_uid();
  }

  public get_email_address(): string {
    return this.email_address.get_email();
  }

  public get_username(): string {
    return this.account_username.get_username();
  }

  public get_password(): string {
    return this.account_password.get_password();
  }

  public get_created_at(): string {
    return this.created_at.toISOString();
  }

  public validate(): void {
    return void undefined;
  }
}
