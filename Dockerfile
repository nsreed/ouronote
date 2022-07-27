
FROM node:18-alpine
COPY /node_modules/gun/ /usr/src/gun/
WORKDIR /usr/src/gun
RUN npm link
WORKDIR /usr/src/app
COPY version.js ./
COPY package*.json ./
COPY server.js ./

RUN npm install /usr/src/gun/
RUN npm install
COPY /dist/demo/ ./dist/demo/
COPY /ouronote-dev.crt ./
COPY /ouronote-dev.key ./
EXPOSE 433
EXPOSE 4330
EXPOSE 80
EXPOSE 8080

VOLUME [ "/usr/src/app/radata" ]


CMD ["node", "server.js"]
