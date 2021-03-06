FROM node:17

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm run build

ENV PORT=8080

EXPOSE 8080

CMD [ "npm" , "start"]