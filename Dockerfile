from node:14.5.0

WORKDIR /usr/src/app

COPY package.json .

COPY .. .

RUN npm install --save

EXPOSE 4001

VOLUME ["/usr/src/app/node_modules"]

CMD ["node", "dist/index.js"]
