# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose port for Vite
EXPOSE 5173

# Start the app in dev mode
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
