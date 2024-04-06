# Use an official Node.js image as the base image
FROM node:20-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json /app

# Install dependencies
RUN npm install
RUN npm install react-scripts --save-dev

# Copy the rest of the application code to the container
COPY . /app

# Build the React app
RUN npm run build

# Use Nginx as the web server
FROM nginx:alpine

# Copy the build output from the previous stage to the NGINX web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start NGINX when the container starts
CMD ["nginx", "-g", "daemon off;"]
