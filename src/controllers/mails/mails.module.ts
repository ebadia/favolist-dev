import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod
} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as passport from 'passport'
import { CorsMiddleware } from '@nest-middlewares/cors'

import { LoggerMiddleware } from '../../common/middlewares/logger.middleware'

import { MailsController } from './mails.controller'
import { MailsService } from './mails.service'

@Module({
  controllers: [MailsController],
  providers: [MailsService],
  // imports: [TypeOrmModule.forFeature([Mails])]
  exports: [MailsService]
})
export class MailsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes(MailsController)

      .apply(LoggerMiddleware)
      .with('Mails')
      .forRoutes(MailsController)

      .apply(CorsMiddleware)
      .forRoutes(MailsController)
  }
}
