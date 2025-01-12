# Official Node.js v22 Alpine image as the base
FROM node:22-alpine

# Sets the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copies the rest of the application code
COPY . .

# Builds the TypeScript code
RUN npm run build

# Exposes the port the app runs on
EXPOSE 3000

# Starts the application
CMD ["npm", "run", "start"]
