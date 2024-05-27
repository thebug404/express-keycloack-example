# Node.js image
FROM node:20.11.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Build app
RUN npm run build

# Expose port
EXPOSE 8080

# Run app
CMD [ "node", "dist/index.js" ]