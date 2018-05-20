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

import { ItemsController } from './items.controller'
import { ItemsService } from './items.service'
import { Item } from '../../entities/Item.entity'

@Module({
  providers: [ItemsService],
  controllers: [ItemsController],
  imports: [TypeOrmModule.forFeature([Item])],
  exports: [ItemsService]
})
export class ItemsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes(ItemsController)

      .apply(LoggerMiddleware)
      .with('Items')
      .forRoutes(ItemsController)
      .apply(CorsMiddleware)
      .forRoutes(ItemsController)
  }
}
