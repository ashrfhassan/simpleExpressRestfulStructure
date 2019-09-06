FROM node:alpine

WORKDIR /var/app

COPY . /var/app -node_modules/

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]

