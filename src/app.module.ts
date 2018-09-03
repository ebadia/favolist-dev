import * as dotenv from 'dotenv'
dotenv.config()

import {
  Module,
  NestModule,
  MiddlewareConsumer,
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
import { AppService } from './app.service'

import { LoggerMiddleware } from './common/middlewares/logger.middleware'
import { RequestTime } from './common/middlewares/requestTime.middleware'

import { MailerModule } from '@nest-modules/mailer'
import * as sendinBlue from 'nodemailer-sendinblue-transport'
import { DaysModule } from './controllers/days/days.module'

const dbConfig: any = {
  url: process.env.DATABASE_URL,
  type: process.env.TYPEORM_CONNECTION,
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
  logging: process.env.TYPEORM_LOGGING,
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [process.env.TYPEORM_MIGRATIONS],
  cli: {
    entitiesDir: process.env.TYPEORM_ENTITIES_DIR
  }
}

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
    DaysModule,
    TypeOrmModule.forRoot(dbConfig),
    MailerModule.forRoot({
      transport: sendinBlue({
        auth: {
          apiUrl: process.env.SENDINBLUE_URL,
          apiKey: process.env.SENDINBLUE_APIKEY
        }
      }),
      defaults: {
        from: '"favolist-mailer" <noreply@favolist.com>'
      },
      templateDir: './src/common/email'
    })
  ],

  // transport: {
  //   host: 'smtp-relay.sendinblue.com',
  //   port: 587,
  //   secure: false,
  //   auth: {
  //     user: 'enric.badia@gmail.com',
  //     pass: 'RCn70JzTVk9r16mj'
  //   }
  // },

  controllers: [AppController],
  providers: [AppService],
  exports: []
})
export class ApplicationModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoggerMiddleware)
      .with('ApplicationModule')
      .forRoutes(AppController)

      .apply(CorsMiddleware)
      .forRoutes('*')
    // .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
