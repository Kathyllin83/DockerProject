# Imagem base do Node.js
FROM node:18

# Define diretório de trabalho
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta que o backend usa
EXPOSE 3001

# Comando para iniciar o backend
CMD ["npm", "start"]
