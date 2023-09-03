FROM node:alpine3.18

RUN mkdir -p /usr/cosmos-surge

COPY ./build /usr/cosmos-surge
COPY ./docker/package.json /usr/cosmos-surge
COPY ./docker/config /usr/cosmos-surge/config
COPY ./static /usr/cosmos-surge/static

WORKDIR /usr/cosmos-surge

RUN npm install

EXPOSE 9999

CMD ["npm", "run", "start"]