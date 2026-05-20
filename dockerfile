FROM node:18-alpine
WORKDIR /app

# Only copy package.json and let npm generate a fresh lockfile
COPY package.json ./
RUN npm install

# NOTE: _env is excluded via .dockerignore — secrets must be injected at
# runtime via docker-compose environment: or --env-file, never baked in.
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]