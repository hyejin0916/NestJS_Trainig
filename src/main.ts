import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as user_config from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const serverConfig = user_config.get('server')
  // config의 server영역을 가지고 오겠다.

  const config = new DocumentBuilder()
    .setTitle('Board example')
    .setDescription('The board API description')
    .setVersion('1.0')
    .addTag('Board')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // const port = 3000;
  const port = serverConfig.port;
  await app.listen(port);
  logger.log(`Application running on port ${port}`)
}
bootstrap();