FROM nginx:1.19.9-alpine
COPY /dist/demo /usr/share/nginx/html
