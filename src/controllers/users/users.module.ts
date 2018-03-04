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

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../../entities/User.entity'

@Module({
  controllers: [UsersController],
  components: [UsersService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService]
})
export class UsersModule implements NestModule {

  public configure( consumer: MiddlewaresConsumer ) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes(UsersController)

      .apply(LoggerMiddleware)
      .with('User')
      .forRoutes(UsersController)

      .apply(RequestTime)
      .forRoutes(UsersController)
  }

}
