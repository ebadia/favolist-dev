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

import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'
import { Order } from '../../entities/Order.entity'

import { UsersModule } from '../users/users.module'
import { ShopsModule } from '../shops/shops.module'
import { ItemsModule } from '../items/items.module'

@Module({
  components: [OrdersService],
  controllers: [OrdersController],
  imports: [
    TypeOrmModule.forFeature([Order]),
    UsersModule,
    ShopsModule,
    ItemsModule
  ]
})
export class OrdersModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes(OrdersController)

      .apply(LoggerMiddleware)
      .with('Orders')
      .forRoutes(OrdersController)

      .apply(CorsMiddleware)
      .forRoutes(OrdersController)
  }
}
