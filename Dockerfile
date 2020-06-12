FROM node:alpine

WORKDIR /sites

COPY package*.json ./

RUN npm install 

COPY . . 

EXPOSE 3000

CMD ["npm", "start"]
