import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
// import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot(process.env.DB_URL),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'auth_nest',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
