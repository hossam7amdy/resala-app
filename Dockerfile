# Use node alpine image as base
FROM node:alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY server/package*.json ./

# Install dependencies
RUN npm install
RUN npm install:shared
RUN npm install:server

# Install TypeScript globally
RUN npm install -g typescript

# Install Prisma CLI globally
RUN npm install -g prisma

# Copy source code
COPY . .

# Generate Prisma client
RUN npm run migrate:prisma

# Build TypeScript
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Use a lighter image for runtime
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy built files from previous stage
COPY --from=server/build /app/build ./build
COPY --from=server/build /app/node_modules ./node_modules
COPY --from=server/build /app/package.json .
COPY --from=server/build /app/public ./public

# Create a uploads directory
RUN mkdir -p /app/uploads

USER node

# Expose port
EXPOSE 5000

# Define command to run the app
CMD ["npm", "start"]
