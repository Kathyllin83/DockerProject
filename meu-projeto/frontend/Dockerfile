FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Expõe a porta padrão do ng serve
EXPOSE 80

# Comando para rodar a aplicação
CMD ["nginx", "-g", "daemon off;"]
