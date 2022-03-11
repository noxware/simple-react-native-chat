# syntax=docker/dockerfile:1

FROM node:14-alpine3.15

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm i

COPY . .

CMD [ "node", "server.js" ]

EXPOSE 8555
