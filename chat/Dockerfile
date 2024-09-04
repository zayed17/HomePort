FROM node:alpine

WORKDIR /chat
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000

CMD [ "npm", "start" ]