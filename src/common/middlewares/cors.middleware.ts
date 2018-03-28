import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common'

@Middleware()
export class CorsMyMiddleware implements NestMiddleware {
  resolve(): ExpressMiddleware {
    return (req, res, next) => {
      const allowedOrigins = ['http://localhost:9000']
      if (allowedOrigins.indexOf(req.header('Origin')) > -1) {
        res.header('Access-Control-Allow-Origin', req.header('Origin'))
        res.header('Access-Control-Allow-Headers', 'content-type')
        res.header('Access-Control-Allow-Methods', 'POST')
      }
      next()
    }
  }
}
