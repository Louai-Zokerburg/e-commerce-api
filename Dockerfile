FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm i -g pnpm

RUN pnpm install

COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Set the command to start the app
CMD ["pnpm", "run", "start:dev"]
