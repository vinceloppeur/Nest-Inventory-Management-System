import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { uuidv7 } from 'uuidv7';

import { type Nullable } from 'app/lib/types/nullable';
import {
  AccountSchema,
  type AccountSchemaProps,
} from 'app/modules/account/account.schema';
import { IRepository } from 'app/lib/repository.base';
import { AccountFactory } from 'app/modules/account/account.factory';
import { type AccountEntity } from 'app/modules/account/account.entity';

@Injectable()
export class AccountRepository extends IRepository<AccountSchemaProps> {
  private account_factory: AccountFactory;

  public constructor(account_factory: AccountFactory, data_source: DataSource) {
    super(AccountSchema, data_source);
    this.account_factory = account_factory;
  }

  public async find_by_email_async(
    email: string,
  ): Promise<Nullable<AccountEntity>> {
    const result: Nullable<AccountSchemaProps> = await this.createQueryBuilder()
      .where('account.email_address = :email', { email })
      .getOne();

    if (result === null) {
      return null;
    }

    return this.account_factory.create({
      account_uid: result.uid,
      email_address: result.email_address,
      account_username: result.username,
      account_password: result.password,
      created_at: result.created_at,
    });
  }

  public async create_from_entity(
    account: AccountEntity,
  ): Promise<AccountEntity> {
    /**
     * we validate account entity here before storing into the repository.
     * Which will throw a custom exception defined in the method itself, bubble
     * up from here to the nearest try-catch or Nest exception filter.
     *
     * I wouldn't worry calling it here since the database also has its own
     * validation that we should comply with, so calling the validation method
     * here sounds like a natural place for me.
     */
    account.validate();

    await this.createQueryBuilder()
      .insert()
      .into(AccountSchema)
      .values({
        uid: account.get_uid(),
        email_address: account.get_email_address(),
        username: account.get_username(),
        password: account.get_password(),
        created_at: account.get_created_at(),
      })
      .execute();

    return account;
  }

  public generate_uid(): string {
    const prefix: string = 'ACC-';

    return prefix.concat(uuidv7());
  }
}
