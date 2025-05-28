/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { YourEntity } from './your-entity-folder/your.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // ou 'mysql', 'sqlite', etc.
      host: 'localhost',
      port: 5432,
      username: 'seu_usuario',
      password: 'sua_senha',
      database: 'nome_do_banco',
      // entities: [YourEntity],
      synchronize: true, // use com cautela em produção
      autoLoadEntities: true,
    }),
    // TypeOrmModule.forFeature([YourEntity]), // importa repositórios para usar em serviços
  ],
})
export class AppModule {}
