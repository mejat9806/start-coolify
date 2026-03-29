# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:22-alpine AS runner
WORKDIR /app

# CRITICAL: TanStack Start needs the production env to serve assets
ENV NODE_ENV=production
ENV PORT=3000

# Copy the build artifacts
COPY --from=builder /app/.output ./.output
# Copy package.json so the runtime knows how to handle the app
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# Start the server using the Nitro entry point
CMD ["node", ".output/server/index.mjs"]