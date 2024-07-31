import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountFactory } from 'app/modules/account/account.factory';
import { AccountSchema } from 'app/modules/account/account.schema';
import { AccountRepository } from 'app/modules/account/account.repository';
import { AccountService } from 'app/modules/account/account.service';
import { AccountController } from 'app/modules/account/account.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccountSchema])],
  exports: [AccountRepository, AccountService],
  providers: [AccountFactory, AccountRepository, AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
