
FROM node:8-alpine AS builder
WORKDIR /usr/src/app

ARG SSH_PRIVATE_KEY

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

RUN mkdir /root/.ssh/

RUN echo "${SSH_PRIVATE_KEY}" >> /root/.ssh/id_rsa && chmod 600 /root/.ssh/id_rsa
RUN touch /root/.ssh/known_hosts
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts

RUN apk add --no-cache --virtual .gyp python make g++
COPY package*.json ./
RUN npm install -g yarn
RUN npm install -g ts-node
RUN yarn install

FROM node:8-alpine
WORKDIR /usr/src/app
COPY . .
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
EXPOSE 3001
USER node
CMD ["npm", "start"]
