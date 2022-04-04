import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import jwt from 'jsonwebtoken';

// function f() {
//   x = 23;
//   let x;
// }

async function bootstrap() {
  const secret = 'my-secret-key';

  const token = jwt.sign({ foo: 'bar' }, secret, { algorithm: 'none' });
  jwt.verify(token, false, { algorithms: ['HS256', 'none'] });

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
