# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files to the container
COPY . .

# Build the app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the server
CMD [ "npm", "start" ]