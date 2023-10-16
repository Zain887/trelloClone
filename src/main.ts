import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
   
  // Enable CORS to allow requests from 'http://localhost:3000'
   app.enableCors({
    origin: 'http://localhost:3000', // Replace with the actual origin of your frontend application
  });


  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Swagger documentation setup
  const config = new DocumentBuilder()
    .setTitle('Trello')
    .setDescription('API for a Trello-like project management application')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();