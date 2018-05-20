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

import { ShopsController } from './shops.controller'
import { ShopsService } from './shops.service'
import { Shop } from '../../entities/Shop.entity'

@Module({
  controllers: [ShopsController],
  providers: [ShopsService],
  exports: [ShopsService],
  imports: [TypeOrmModule.forFeature([Shop])]
})
export class ShopsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes(ShopsController)

      .apply(LoggerMiddleware)
      .with('Shop')
      .forRoutes(ShopsController)

      .apply(RequestTime)
      .forRoutes(ShopsController)
      .apply(CorsMiddleware)
      .forRoutes(ShopsController)
  }
}
