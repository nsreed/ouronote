
FROM node:18-alpine3.16
# COPY /node_modules/gun/ /usr/src/gun/
# Hmm... is this useful anymore?
# WORKDIR /usr/src/gun
# RUN npm link
USER node:node
WORKDIR /usr/src/app
# COPY version.js ./
COPY package*.json ./
COPY index.js ./

# RUN npm install /usr/src/gun/
RUN npm install
COPY /dist/demo/ ./dist/demo/
EXPOSE 433
EXPOSE 4330
EXPOSE 80
EXPOSE 8080

VOLUME [ "/usr/src/app/radata" ]

CMD ["node", "index.js", "heroku"]
