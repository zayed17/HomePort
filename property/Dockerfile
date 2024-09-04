FROM node:alpine

WORKDIR /property
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5003

CMD [ "npm", "start" ]