# Stage 1: Build
FROM node:20.11.1-alpine AS builder

WORKDIR /app

# Build argument for NPM token
ARG NPM_TOKEN

# Validate NPM_TOKEN is provided
RUN if [ -z "$NPM_TOKEN" ]; then echo "ERROR: NPM_TOKEN build argument is required" && exit 1; fi

# Create .npmrc for private packages authentication
RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc

# Copy package files
COPY package.json package-lock.json ./
COPY packages/gateway/package.json ./packages/gateway/

# Install dependencies
RUN npm install --legacy-peer-deps

# Remove .npmrc for security (token no longer needed)
RUN rm -f .npmrc

# Copy source code
COPY . .

# Build the application
WORKDIR /app/packages/gateway
RUN npm run build

# Stage 2: Runtime using serve
FROM node:20.11.1-alpine

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built files from builder stage
COPY --from=builder /app/packages/gateway/build ./procedureautomation

# Copy entrypoint script
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# Expose port
EXPOSE 3000

# Health checkk
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["./entrypoint.sh"]