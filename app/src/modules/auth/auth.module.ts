import { Module } from '@nestjs/common';

import { AccountFactory } from 'app/modules/account/account.factory';
import { AccountRepository } from 'app/modules/account/account.repository';
import { AccountModule } from 'app/modules/account/account.module';
import { AccountService } from 'app/modules/account/account.service';
import { AuthService } from 'app/modules/auth/auth.service';
import { AuthController } from 'app/modules/auth/auth.controller';

@Module({
  imports: [AccountModule],
  providers: [AccountFactory, AccountRepository, AccountService, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
