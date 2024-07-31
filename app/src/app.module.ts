import { Module, MiddlewareConsumer, type NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as morgan from 'morgan';

import { typeorm_config } from 'app/configs/typeorm.config';
import { AccountModule } from 'app/modules/account/account.module';
import { AuthModule } from 'app/modules/auth/auth.module';
import { ExceptionBaseFilter } from 'app/lib/filters/exception-base.filter';

@Module({
  imports: [TypeOrmModule.forRoot(typeorm_config), AccountModule, AuthModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionBaseFilter,
    },
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(morgan('combined')).forRoutes('/');
  }
}
