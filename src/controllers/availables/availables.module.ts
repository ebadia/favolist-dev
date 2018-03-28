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

import { AvailablesController } from './availables.controller'
import { AvailablesService } from './availables.service'
import { Available } from '../../entities/Available.entity'

@Module({
  controllers: [AvailablesController],
  components: [AvailablesService],
  imports: [TypeOrmModule.forFeature([Available])]
})
export class AvailablesModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes(AvailablesController)

      .apply(LoggerMiddleware)
      .with('Available')
      .forRoutes(AvailablesController)
      .apply(CorsMiddleware)
      .forRoutes(AvailablesController)
  }
}
