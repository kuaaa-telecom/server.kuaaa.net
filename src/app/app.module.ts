import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { configModule } from '../common/config/config.module';
import { CommonModule } from '../common/common.module';
import { MemberModule } from '../member/member.module';

@Module({
  imports: [configModule, CommonModule, MemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
