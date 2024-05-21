# Use a lightweight Node.js base image
FROM node:alpine AS builder


# Set working directory for the build context
WORKDIR /app


# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./


# Install dependencies (if package-lock.json exists)
RUN npm ci || npm install


# Create a non-root user for the application process
RUN adduser --disabled-password --gecos "" nodeuser


# Copy the rest of your application code (replace with your directory structure)
COPY . .


# Switch to the non-root user for the application process
USER nodeuser


# Define the default command to run the Node.js application
CMD [ "npm", "start" ]


