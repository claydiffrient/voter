FROM node:5

EXPOSE 8080

RUN mkdir -p /user/src/app
ADD . /usr/src/app
WORKDIR /usr/src/app

RUN npm install

CMD npm start