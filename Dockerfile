FROM node:5

EXPOSE 3000

RUN mkdir -p /user/src/app
ADD . /usr/src/app
WORKDIR /usr/src/app

RUN npm install

CMD npm run start-server