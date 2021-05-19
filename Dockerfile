FROM overseers/battle-stardom-frontend AS frontend

FROM node:14.16.0-alpine AS backend

WORKDIR /usr/src/app

COPY . .

RUN npm run build

FROM overseers/certs AS certs

FROM node:14.16.0-alpine AS deploy

RUN addgroup -S -g 10001 appGrp \
    && adduser -S -D -u 10000 -s /sbin/nologin -h /opt/app -G appGrp app\
    && chown -R 10000:10001 /opt/app

#NEED TO INSTALL NGINX
RUN apk update
RUN apk add nginx

COPY --from=certs /etc/ssl /etc/ssl

WORKDIR /opt/app

RUN rm /opt/nginx/nginx.conf

RUN echo "
user app;
worker_processes auto;
server {
    listen 80;
    listen [::]:80;
    server_name pertinate.info www.pertinate.info;
    return 302 https://$server_name$request_uri;
}

server {

    # SSL configuration

    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    ssl_certificate         /etc/ssl/certificate.pem;
    ssl_certificate_key     /etc/ssl/private.key;

    server_name pertinate.info www.pertinate.info;

    location / {
             proxy_pass https://localhost:8080/;
    }
}
" >> /opt/nginx/nginx.conf

#COPY BUILD & CERTS

COPY --from=backend /usr/src/app/target /opt/app

RUN npm install --only=production

EXPOSE 8080

CMD npm run start
