FROM node:18 AS base

WORKDIR /app

COPY package*.json ./

RUN npm install

FROM base AS prod

COPY . .

EXPOSE 4000

CMD ["node", "index.js"]
