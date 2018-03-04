import {
  Module,
  NestModule,
  MiddlewaresConsumer,
  RequestMethod
} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as passport from 'passport'

import { LoggerMiddleware } from '../../common/middlewares/logger.middleware'

import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { Product } from '../../entities/Product.entity'

@Module({
  controllers: [ProductsController],
  components: [ProductsService],
  imports: [TypeOrmModule.forFeature([Product])]
})
export class ProductsModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes(ProductsController)

      .apply(LoggerMiddleware)
      .with('Product')
      .forRoutes(ProductsController)
  }
}
