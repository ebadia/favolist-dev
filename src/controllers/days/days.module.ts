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

import { DaysController } from './days.controller'
import { DaysService } from './days.service'
import { Day } from '../../entities/Day.entity'

@Module({
  providers: [DaysService],
  controllers: [DaysController],
  imports: [TypeOrmModule.forFeature([Day])],
  exports: [DaysService]
})
export class DaysModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes(DaysController)

      .apply(LoggerMiddleware)
      .with('Days')
      .forRoutes(DaysController)
      .apply(CorsMiddleware)
      .forRoutes(DaysController)
  }
}
