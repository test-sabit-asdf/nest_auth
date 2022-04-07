import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import fs from 'fs';
//import jwt from 'jsonwebtoken';

// function f() {
//   x = 23;
//   let x;
// }

async function bootstrap() {
  // const secret = 'my-secret-key';

  // const token = jwt.sign({ foo: 'bar' }, secret, { algorithm: 'none' });
  // jwt.verify(token, false, { algorithms: ['HS256', 'none'] });

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Auth example')
    .setDescription('The Auth API description')
    .setVersion('1.0')
    .addTag('Auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  //fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
