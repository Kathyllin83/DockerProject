FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli
RUN npm install

COPY . .

# Expõe a porta padrão do ng serve
EXPOSE 4200

# Comando para rodar a aplicação
CMD ["ng", "serve", "--host", "0.0.0.0"]
