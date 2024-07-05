import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //* config swaggerConfig
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ecommerce')
    .setDescription('proyecto M4 / API  construida con NestJS')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  //* debemos avisarle a swagger quien es nuestro servidor
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  //---fin de config de swagger

  app.use(logger);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); //gracias a whitelist, solo me va a tomar la informacion que tengo validadar- me va a permitir ahorrar escribir lineas de codigo para crear un objeto o nueva instacia que solo me  permita tomar la informacion que quiero osea que por body-
  await app.listen(PORT); // escucha en el puerto = 3000
}
bootstrap();
