FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "build"]
CMD ["npm", "run", "db:build"]
CMD ["npm", "run", "db:migrate"]
CMD ["npm", "run", "dev"]
