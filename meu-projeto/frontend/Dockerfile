# Imagem base do Node.js
FROM node:18

# Define diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala dependências do Angular
RUN npm install -g @angular/cli && npm install

# Copia o restante do código
COPY . .

# Build da aplicação Angular
RUN ng build --prod

# Usar o nginx para servir o build
FROM nginx:alpine

# Copia o build para a pasta padrão do nginx
COPY --from=0 /app/dist/ /usr/share/nginx/html

# Exponha a porta do nginx
EXPOSE 80

# Comando padrão do nginx
CMD ["nginx", "-g", "daemon off;"]
