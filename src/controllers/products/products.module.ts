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

import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { Product } from '../../entities/Product.entity'

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([Product])]
})
export class ProductsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes(ProductsController)

      .apply(LoggerMiddleware)
      .with('Product')
      .forRoutes(ProductsController)
      .apply(CorsMiddleware)
      .forRoutes(ProductsController)
  }
}
