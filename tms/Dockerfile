# Use Node.js 24 Alpine for smaller image size and latest features
FROM node:24-alpine

# Set working directory
WORKDIR /usr/src/app

# Install system dependencies
RUN apk add --no-cache python3 make g++ curl bash
RUN apk add --no-cache ffmpeg

# Set npm global directory
ENV NPM_CONFIG_PREFIX=/usr/local/lib/node_modules
ENV PATH=$PATH:/usr/local/lib/node_modules/.bin

# Install global packages
RUN npm install -g @nestjs/cli

# Expose ports for both API and web
EXPOSE 3000 3001 9229

# Default command (will be overridden by docker-compose)
CMD ["npm", "start"]
