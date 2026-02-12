# 1) Build stage: compile Vite/React app
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm ci

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
