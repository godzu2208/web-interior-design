# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build project
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Install serve để chạy production build
RUN npm install -g serve

# Copy built files từ builder
COPY --from=builder /app/dist ./dist


ENV PORT=8080
# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:$PORT', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start server
CMD ["serve", "-s", "dist", "-l", $PORT]