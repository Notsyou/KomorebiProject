FROM node:18-alpine
WORKDIR /app

# We manually create a package.json inside the container if it doesn't exist
RUN echo '{"type":"module","dependencies":{"express":"latest","cors":"latest","mysql2":"latest","bcrypt":"latest","jsonwebtoken":"latest"}}' > package.json

RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]