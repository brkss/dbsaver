from node:14.5.0

RUN curl -fsSLO https://get.docker.com/builds/Linux/x86_64/docker-17.04.0-ce.tgz \
  && tar xzvf docker-17.04.0-ce.tgz \
  && mv docker/docker /usr/local/bin \
  && rm -r docker docker-17.04.0-ce.tgz

WORKDIR /usr/src/app

COPY package.json .

COPY .. .

RUN npm install --save

EXPOSE 4001

VOLUME ["/usr/src/app/node_modules"]

CMD ["node", "dist/index.js"]
