import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { CorsMiddleware } from '@nest-middlewares/cors'

import { AppController } from './app.controller'
import { AccountsModule } from './controllers/accounts/accounts.module'
import { UsersModule } from './controllers/users/users.module'
import { ShopsModule } from './controllers/shops/shops.module'
import { ProductsModule } from './controllers/products/products.module'
import { AvailablesModule } from './controllers/availables/availables.module'
import { OrdersModule } from './controllers/orders/orders.module'
import { ItemsModule } from './controllers/items/items.module'
import { EventsModule } from './controllers/events/events.module'

import { LoggerMiddleware } from './common/middlewares/logger.middleware'
import { RequestTime } from './common/middlewares/requestTime.middleware'

@Module({
  imports: [
    UsersModule,
    ShopsModule,
    ProductsModule,
    AccountsModule,
    AvailablesModule,
    OrdersModule,
    ItemsModule,
    EventsModule,
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  components: [],
  exports: []
})
export class ApplicationModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewaresConsumer): void {
    consumer
      .apply(LoggerMiddleware)
      .with('ApplicationModule')
      .forRoutes(AppController)
      .apply(RequestTime)
      .forRoutes(AppController)
      .apply(CorsMiddleware)
      .forRoutes(AppController)
  }
}
