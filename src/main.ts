import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PrismaModel } from './_gen/prisma-class'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { cors: true },
  )

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // global transformation enabled
    }),
  )

  const config = new DocumentBuilder()
    .setTitle('Last Mile Monitoring Application')
    .setDescription(
      'The LMM API description. Download [OpenAPI v3 Specification JSON](http://localhost:3000/api-json)',
    )
    .setVersion('0.1')
    // .addServer('HTTPS')
    .build()
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [...PrismaModel.extraModels],
  })
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)

  // add hot reloading
  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
  // add prisma service shutdown hooks: https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
  const prismaService: PrismaService = app.get(PrismaService)
  prismaService.enableShutdownHooks(app)
}
bootstrap()
