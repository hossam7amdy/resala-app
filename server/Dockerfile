# Use node alpine image as base
FROM node:alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install TypeScript globally
RUN npm install -g typescript

# Install Prisma CLI globally
RUN npm install -g prisma

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Use a lighter image for runtime
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy built files from previous stage
COPY --from=dist /app/build ./build
COPY --from=dist /app/node_modules ./node_modules
COPY --from=dist /app/package.json .
COPY --from=dist /app/public ./public

# Create a uploads directory
RUN mkdir -p /app/uploads

USER node

# Expose port
EXPOSE 5000

# Define command to run the app
CMD ["npm", "start"]
