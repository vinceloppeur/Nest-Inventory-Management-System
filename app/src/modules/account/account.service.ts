import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';

import { AccountFactory } from 'app/modules/account/account.factory';
import {
  CreateAccountResponseDto,
  type CreateAccountRequestDto,
} from 'app/modules/account/dtos/create-account.dto';
import { AccountRepository } from 'app/modules/account/account.repository';
import { AccountEntity } from 'app/modules/account/account.entity';
import { type Nullable } from 'app/lib/types/nullable';
import { AccountAlreadyExistsException } from 'app/modules/account/exceptions/account-already-exists.exception';
import { Validator } from 'app/lib/utils/validator';
import { ValidationException } from 'app/lib/exceptions/validation.exception';
import {
  GetAccountInfoByEmailResponseDto,
  type GetAccountInfoByEmailRequestDto,
} from 'app/modules/account/dtos/get-account-by-email.dto';
import { AccountDoesNotExistException } from 'app/modules/account/exceptions/account-does-not-exist.exception';

@Injectable()
export class AccountService {
  private account_factory: AccountFactory;
  private account_repository: AccountRepository;

  public constructor(
    account_factory: AccountFactory,
    @InjectRepository(AccountRepository) account_repository: AccountRepository,
  ) {
    this.account_factory = account_factory;
    this.account_repository = account_repository;
  }

  public async create_account(
    request: CreateAccountRequestDto,
  ): Promise<CreateAccountResponseDto> {
    const existing: Nullable<AccountEntity> =
      await this.account_repository.find_by_email(request.email);

    if (existing !== null) {
      throw new AccountAlreadyExistsException([
        'another account has already been registered with the same email',
      ]);
    }

    this.validate_password(request.password);

    request.password = await argon2.hash(request.password);

    const account: AccountEntity = this.account_factory.create({
      account_uid: this.account_repository.generate_uid(),
      email_address: request.email,
      account_username: request.username,
      account_password: request.password,
    });

    this.account_repository.create_from_entity(account);

    return {
      uid: account.get_uid(),
      email: account.get_email_address(),
      username: account.get_username(),
      createdAt: new Date(account.get_created_at()),
    };
  }

  /**
   * @public
   * this service method must be called carefully because it returns all
   * information about an account.
   * @param {GetAccountInfoByEmailRequestDto} request
   */
  public async find_account_by_email(
    request: GetAccountInfoByEmailRequestDto,
  ): Promise<GetAccountInfoByEmailResponseDto> {
    const account: Nullable<AccountEntity> =
      await this.account_repository.find_by_email(request.email);

    if (account === null) {
      throw new AccountDoesNotExistException([
        'no account exists with the given email',
      ]);
    }

    return {
      uid: account.get_uid(),
      email: account.get_email_address(),
      username: account.get_username(),
      password: account.get_password(),
      createdAt: account.get_created_at(),
    };
  }

  /**
   * @public
   * we enfore rules about account password security here in this service
   * method and will throw `ValidationException` if password is checked to be
   * invalid.
   * @param {string} password
   */
  private validate_password(password: string): void {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('password should be 8 characters or longer');
    }

    if (Validator.has_lowercase(password) === false) {
      errors.push('password should have a lowercase letter');
    }

    if (Validator.has_uppercase(password) === false) {
      errors.push('password should have an uppercase letter');
    }

    if (Validator.has_number(password) === false) {
      errors.push('password should have at least one number');
    }

    if (Validator.has_symbol(password) === false) {
      errors.push('password should have at least one symbol');
    }

    if (errors.length > 0) {
      throw new ValidationException(errors);
    }
  }
}
