import {
  Module,
  NestModule,
  MiddlewaresConsumer,
  RequestMethod
} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as passport from 'passport'
import { SFJwtStrategy } from './passport/jwt.strategy'

import { AccountsController } from './accounts.controller'
import { AccountsService } from './accounts.service'
import { User } from '../../entities/User.entity'

@Module({
  controllers: [AccountsController],
  components: [AccountsService, SFJwtStrategy],
  imports: [TypeOrmModule.forFeature([User])]
})
export class AccountsModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes({ path: '/accounts/authorized', method: RequestMethod.GET })
  }
}
