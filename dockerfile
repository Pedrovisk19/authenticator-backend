# Usar imagem Node oficial
FROM node:18

# Criar diretório da aplicação
WORKDIR /usr/src/app

# Copiar package.json e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar código restante
COPY . .

# Build (se usar TS direto)
RUN npm run build

# Expor porta 3001 e rodar app
EXPOSE 3002
CMD ["npm", "run", "start:prod"]
