
FROM node:14.15.0-alpine

WORKDIR /app

COPY package*.json ./


RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# Start the application
CMD ["npm", "start"]
