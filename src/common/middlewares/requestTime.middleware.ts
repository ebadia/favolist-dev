import { Injectable, NestMiddleware, ExpressMiddleware } from '@nestjs/common'

@Injectable()
export class RequestTime implements NestMiddleware {
  resolve(): ExpressMiddleware {
    return (req, res, next) => {
      const atime = Date()
      console.log(`${req.method}${req.path} done at ${atime.toString()}`)
      next()
    }
  }
}
