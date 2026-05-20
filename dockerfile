FROM node:18-alpine
WORKDIR /app

# Only copy package.json and let npm generate a fresh lockfile
COPY package.json ./
RUN npm install

COPY . .
EXPOSE 3000
CMD ["node", "server.js"]