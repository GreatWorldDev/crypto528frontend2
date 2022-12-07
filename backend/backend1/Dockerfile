FROM node:14-alpine

RUN mkdir -p /var/nft

WORKDIR /var/nft/

COPY package.json .
COPY tsconfig.json .
COPY . .
COPY .env .

RUN npm install

RUN npm run build
EXPOSE 3000

CMD ["yarn" , "start:dev"]

