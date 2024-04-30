FROM nginx:alpine

WORKDIR /etc/nginx/

COPY default.conf.template /etc/nginx/templates/default.conf.template

# Copy ssl certificates
COPY ./certs /etc/nginx/certs
