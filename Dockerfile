# Use uma imagem base com Node.js
FROM node:18 AS build

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos do projeto Angular para o container
COPY . /app/

# Instale as dependências do Angular
RUN npm install

# Construa a aplicação Angular
RUN npm run build --prod

# Use uma imagem base para servir o conteúdo estático (Nginx)
FROM nginx:alpine

# Copie os arquivos de build do Angular para o diretório do Nginx
COPY --from=build /app/dist/ /usr/share/nginx/html

# Exponha a porta 80 para servir a aplicação
EXPOSE 80
