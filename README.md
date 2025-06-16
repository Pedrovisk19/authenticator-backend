
# Backend - Sistema de Autenticação e Autorização

Este é o backend da aplicação de autenticação e autorização, desenvolvido com [NestJS](https://nestjs.com/), utilizando PostgreSQL como banco de dados e JWT para autenticação.

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT - JSON Web Token](https://jwt.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt) para hash de senhas
- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## 📦 Instalação

```bash
# Instale as dependências
npm install

# Configure o banco de dados (ex: PostgreSQL)
# Crie um arquivo .env com as seguintes variáveis (exemplo):
DATABASE_URL=postgres://user:password@localhost:5432/database_name
JWT_SECRET=seu_jwt_secreto
PORT=3002

# Rode as migrações ou sincronize as entidades com o banco
# (se estiver usando sincronização automática, certifique-se de que está ativado)

# Rode o servidor em modo de desenvolvimento
npm run start:dev
```

## 🛠 Estrutura Básica

- `auth/` - Módulo responsável por login e autenticação JWT.
- `users/` - CRUD de usuários, com proteção por token.
- `middlewares/` - Middlewares para validação de token (caso necessário).
- `guards/` - JWT Guard, Role Guard (caso haja controle de perfis).
- `dto/` - Data Transfer Objects para validações com class-validator.

## 🔐 Funcionalidades de Autenticação

- Cadastro de usuário com senha criptografada
- Login com retorno de JWT
- Proteção de rotas com `JwtGuard`
- Verificação de usuário duplicado por e-mail

## 🔁 Rotas Expostas

```
POST   /auth/login         # Login de usuário (retorna JWT)
POST   /users/create       # Cadastro de novo usuário
GET    /users              # Lista todos os usuários (rota protegida)
DELETE /users/:id          # Deleta usuário (rota protegida)
```

## ⚠️ Considerações

- Certifique-se de que o banco esteja rodando localmente e acessível.
- Use o token JWT no cabeçalho Authorization para acessar rotas protegidas.

Exemplo:
```
Authorization: Bearer seu_token_jwt
```

## 📄 Licença

Este projeto está sob a licença MIT.
