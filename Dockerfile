# --- STAGE 1: Base Architecture & Global pnpm Configuration ---
FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

# --- STAGE 2: Production Builder ---
FROM base AS builder
# Using the * wildcard prevents builds from crashing if pnpm-workspace.yaml doesn't exist
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./

# Fast layer caching using native Docker build mounts
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copy source code and build optimized JavaScript bundles
COPY . .
RUN pnpm exec tsc -p tsconfig.build.json

# Strip dev-dependencies completely out of the node_modules directory
RUN rm -rf node_modules
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# --- STAGE 3: Final Lean & Secure Multi-Environment Runner ---
FROM base AS runner
ENV NODE_ENV=production

# Bring over only the lean compiled bundles and production dependencies
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/drizzle ./drizzle

# Copy the lifecycle orchestrator script
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# Demote process privileges out of root for bulletproof container security
USER node

EXPOSE 5000

ENTRYPOINT ["./entrypoint.sh"]

# Single Source of Truth: Executes your package.json start script directly!
CMD ["pnpm", "run", "start"]