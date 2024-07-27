import { Module, MiddlewareConsumer, type NestModule } from '@nestjs/common';
import * as morgan from 'morgan';

@Module({
  imports: [],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(morgan('combined')).forRoutes('/');
  }
}
