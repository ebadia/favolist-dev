import {
  Module,
  NestModule,
  MiddlewaresConsumer,
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
  components: [MailsService],
  // imports: [TypeOrmModule.forFeature([Mails])]
  exports: [ MailsService ]
})
export class MailsModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
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
