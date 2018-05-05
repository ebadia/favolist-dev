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
import { MailsModule } from './controllers/mails/mails.module'
import { EventsModule } from './controllers/events/events.module'

import { LoggerMiddleware } from './common/middlewares/logger.middleware'
import { RequestTime } from './common/middlewares/requestTime.middleware'

import { MailerModule } from '@nest-modules/mailer'
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
    MailsModule,
    TypeOrmModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        secure: false,
        auth: {
          user: 'enric.badia@gmail.com',
          pass: 'RCn70JzTVk9r16mj'
        }
      },
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

      .apply(CorsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }


}
