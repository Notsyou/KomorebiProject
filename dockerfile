FROM node:18-alpine
WORKDIR /app

# Copy the lockfile too, and run 'ci' for a strict, production-ready build
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .
EXPOSE 3000
CMD ["node", "server.js"]