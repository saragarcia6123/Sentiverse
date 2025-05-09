FROM node:24-slim

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app’s source code
COPY . .

# Expose the port your app runs on (change this if your app uses a different port)
EXPOSE 5173

# Start the application
CMD ["nginx", "-g", "daemon off"]
