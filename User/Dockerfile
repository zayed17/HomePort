FROM node:alpine

WORKDIR /user
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5001

CMD [ "npm", "start" ]