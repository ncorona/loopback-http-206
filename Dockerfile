FROM node:8.6.0-alpine

RUN apk update && apk add bash nano

COPY . /code
WORKDIR /code

CMD bash run.sh

VOLUME /code/client/assets
EXPOSE 3000