FROM node:latest

RUN mkdir -p /my_app_test

WORKDIR /my_app_test

COPY package.json /my_app_test

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

