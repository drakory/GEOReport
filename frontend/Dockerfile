FROM node:14-alpine
WORKDIR /app

ENV PORT=8080

COPY package.json .
COPY *.lock .

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "start"]