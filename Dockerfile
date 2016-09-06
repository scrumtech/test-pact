FROM node:5

RUN mkdir -p /vagrant/pacts && mkdir -p /vagrant/logs && npm config set strict-ssl false
WORKDIR /vagrant
COPY src /vagrant/src
COPY ["package.json", ".mocharc", ".babelrc", "/vagrant/"]
RUN export NODE_TLS_REJECT_UNAUTHORIZED=0 && \
  npm i
