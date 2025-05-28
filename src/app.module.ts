/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres", // ou 'mysql', 'sqlite', etc.
      host: "localhost",
      port: 5432,
      username: "nestuser",
      password: "nestpass",
      database: "nestdb",
      imports: [TypeOrmModule.forFeature([User])],
      providers: [UserService],
      synchronize: true, // use com cautela em produção
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([User]), // importa repositórios para usar em serviços
  ],
})
export class AppModule {}
