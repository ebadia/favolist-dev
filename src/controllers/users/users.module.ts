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
import { RequestTime } from '../../common/middlewares/requestTime.middleware'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { User } from '../../entities/User.entity'
import { MailsModule } from '../mails/mails.module'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User]), MailsModule],
  exports: [UsersService]
})
export class UsersModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes(UsersController)

      .apply(LoggerMiddleware)
      .with('User')
      .forRoutes(UsersController)

      .apply(RequestTime)
      .forRoutes(UsersController)
  }
}
