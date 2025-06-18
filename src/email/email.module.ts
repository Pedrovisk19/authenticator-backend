import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { ConfigModule } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { EmailToken } from './entities/email-token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    JwtModule.register({ secret: process.env.JWT_SECRET || 'secretKey', signOptions: { expiresIn: '1h' }, }),
    TypeOrmModule.forFeature([EmailToken]) // <- necessário aqui
  ],
  controllers: [EmailController],
  providers: [EmailService, UserService],
  exports: [EmailService] // <- se quiser usar em outro módulo
})
export class EmailModule {} 
