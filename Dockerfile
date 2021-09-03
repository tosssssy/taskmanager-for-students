FROM node:14-alpine

WORKDIR /workspace

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000