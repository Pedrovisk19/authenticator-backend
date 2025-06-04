import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    username: 'postgres',
    port: 5433,
    database: 'postgres',
    password: '123456',
    autoLoadEntities: true,
    synchronize: true,
  }), UserModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
