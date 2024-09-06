FROM node:20

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

RUN npm install -g prisma

COPY . .

RUN npm run build

RUN npx prisma migrate dev

EXPOSE 3333

CMD [ "npm", "start" ]
