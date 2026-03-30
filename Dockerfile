# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

# Only copy dependency files first to leverage Docker cache
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the rest of the code and build
COPY . .
RUN npm run build

# Stage 2: Production Runner
FROM node:22-alpine AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

# Copy the generated output from the builder
# TanStack Start puts everything in .output (both server and public)
COPY --from=builder /app/.output ./.output

# Optional: Copy package.json if you have runtime scripts, 
# but the standalone index.mjs usually doesn't need it.
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# Start the server
CMD ["node", ".output/server/index.mjs"]