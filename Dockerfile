
FROM node:14-alpine
RUN apk add --no-cache git
WORKDIR /usr/src/app
COPY /dist/demo/ ./dist/demo/
COPY version.js ./
COPY package*.json ./
COPY server.js ./
RUN npm install
EXPOSE 433
EXPOSE 4330
EXPOSE 80
EXPOSE 8080


CMD ["node", "server.js"]
