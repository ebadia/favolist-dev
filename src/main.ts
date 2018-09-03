import { NestFactory } from '@nestjs/core'
import { ApplicationModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule)
  app.setGlobalPrefix('api/v1')
  // tslint:disable-next-line:radix
  await app.listen(parseInt(process.env.PORT) || 8080)
}
bootstrap()
