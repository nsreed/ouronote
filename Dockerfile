FROM nginx:1.19.9-alpine
COPY /dist/demo /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
