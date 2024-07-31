import { Module } from '@nestjs/common';

import { AccountFactory } from 'app/modules/account/account.factory';
import { AccountRepository } from 'app/modules/account/account.repository';
import { AccountModule } from 'app/modules/account/account.module';
import { AccountService } from 'app/modules/account/account.service';
import { AuthService } from 'app/modules/auth/auth.service';
import { AuthController } from 'app/modules/auth/auth.controller';
import { JwtModule } from 'app/modules/jwt/jwt.module';
import { JwtService } from 'app/modules/jwt/jwt.service';

@Module({
  imports: [JwtModule, AccountModule],
  providers: [
    AccountFactory,
    AccountRepository,
    AccountService,
    JwtService,
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
