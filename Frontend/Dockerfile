# 1) Build stage: compile Vite/React app
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./

# Configure npm for better network reliability and install dependencies
RUN npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm config set fetch-retries 5 && \
    npm config set registry https://registry.npmjs.org/ && \
    npm config set network-timeout 600000 && \
    npm ci --network-timeout=600000 || \
    (echo "First attempt failed, retrying in 5 seconds..." && \
     sleep 5 && \
     npm ci --network-timeout=600000) || \
    (echo "Second attempt failed, retrying with npm install as fallback..." && \
     sleep 10 && \
     npm install --network-timeout=600000)

# Copy source and build
COPY . .
RUN npm run build

# 2) Runtime stage: serve built files using nginx
FROM nginx:alpine

# Copy build output to nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose HTTP
EXPOSE 80

# nginx runs automatically
CMD ["nginx", "-g", "daemon off;"]