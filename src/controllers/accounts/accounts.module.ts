import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod
} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as passport from 'passport'
import { SFJwtStrategy } from './passport/jwt.strategy'
import { CorsMiddleware } from '@nest-middlewares/cors'

import { AccountsController } from './accounts.controller'
import { AccountsService } from './accounts.service'
import { User } from '../../entities/User.entity'

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, SFJwtStrategy],
  imports: [TypeOrmModule.forFeature([User])]
})
export class AccountsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes('/accounts/authorized')
      // .forRoutes({ path: '/accounts/authorized', method: RequestMethod.GET })
      .apply(CorsMiddleware)
      .forRoutes(AccountsController)
  }
}
