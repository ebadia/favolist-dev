import {
  Module,
  NestModule,
  MiddlewaresConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as passport from 'passport';

import { LoggerMiddleware } from '../../common/middlewares/logger.middleware'
import { RequestTime } from '../../common/middlewares/requestTime.middleware'

import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';
import { Shop } from '../../entities/Shop.entity'

@Module({
  controllers: [ShopsController],
  components: [ShopsService],
  exports: [ShopsService],
  imports: [TypeOrmModule.forFeature([Shop])],
})
export class ShopsModule implements NestModule {

  public configure( consumer: MiddlewaresConsumer ) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes(ShopsController)

      .apply(LoggerMiddleware)
      .with('Shop')
      .forRoutes(ShopsController)

      .apply(RequestTime)
      .forRoutes(ShopsController)
  }

}
