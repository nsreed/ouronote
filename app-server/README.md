# app-server

Ultimately, a server is antithetical to the idea of peer to peer. Though this doesn't mean we don't need one.

## HTTPS in Dev

The devcontainer sets up the server on a different container. It'll even make the certs automatically thanks to geniuses on the internet. https://stackoverflow.com/a/23020464

```
openssl req -new -x509 -days 365 -nodes \
  -out /etc/ssl/certs/postfix.pem \
  -keyout /etc/ssl/private/postfix.pem \
  -subj "/C=RO/ST=Bucharest/L=Bucharest/O=IT/CN=www.example.ro"
```
