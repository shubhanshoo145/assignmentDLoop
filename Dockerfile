FROM node:19-alpine3.16
WORKDIR /home/node/app
COPY package*.json ./
RUN npm i
COPY . .