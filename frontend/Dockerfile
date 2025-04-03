# Dockerfile.frontend

# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the rest of the application
COPY . .

# Run the command to build 
RUN yarn install

# Expose the port the React app will run on
EXPOSE 5173

# Command to run the React app
CMD ["yarn", "dev", "--host", "0.0.0.0"]
