import { NestFactory } from '@nestjs/core'
import { ApplicationModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule)
  app.setGlobalPrefix('api/v1')
  await app.listen(8080)
}
bootstrap()
