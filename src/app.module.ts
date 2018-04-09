import {
  Module,
  NestModule,
  MiddlewaresConsumer,
  RequestMethod
} from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { CorsMiddleware } from '@nest-middlewares/cors'
import { CorsMyMiddleware } from './common/middlewares/cors.middleware'
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

import { MailerModule } from '@yops/nest-mailer'
import * as sendinBlue from 'nodemailer-sendinblue-transport'

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
    TypeOrmModule.forRoot(),
    MailerModule.forRoot({
      transport: sendinBlue({
        apiKey: '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'
      }),
      defaults:{
        from: '"favolist-mailer" <noreply@favolist.com>'
      },
      templateDir: './src/common/email'
    })
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
      .forRoutes({ path: '*', method: RequestMethod.ALL })
    // .apply(CorsMyMiddleware)
    // .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
