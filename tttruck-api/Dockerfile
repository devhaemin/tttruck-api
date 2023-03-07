# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY ./ .

# Set the environment variable for the port number the application will listen on
ENV PORT=3000

# Expose the port the application will listen on
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]