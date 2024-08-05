import { Module, MiddlewareConsumer, type NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as morgan from 'morgan';

/* configs */
import { typeorm_config } from 'app/configs/typeorm.config';

/* modules */
import { ProjectModule } from 'app/modules/project/project.module';

/* filters */
import { ExceptionBaseFilter } from 'app/lib/filters/exception-base.filter';

@Module({
  imports: [TypeOrmModule.forRoot(typeorm_config), ProjectModule],
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
