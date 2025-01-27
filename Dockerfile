# Base image with common setup
FROM node:18 AS base
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
ARG NODE_ENV
RUN npm install

# Copy application source code
COPY . .

# Expose application port
EXPOSE 4000

# Default command (can be overridden in derived stages)
CMD ["npm", "run", "start-dev"]

# Development stage
FROM base AS development
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
CMD ["npm", "run", "start-dev"]

# Production stage
FROM base AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Reinstall dependencies for production
RUN npm install --only=production

# Set the production command
CMD ["npm", "start"]
