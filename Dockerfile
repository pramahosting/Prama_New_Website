# ---------- Stage 1: build the React/Vite frontend ----------
FROM node:20-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# ---------- Stage 2: install server dependencies ----------
FROM node:20-alpine AS server-deps
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci --omit=dev

# ---------- Stage 3: production runtime ----------
FROM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

# Non-root user for security
RUN addgroup -S prama && adduser -S prama -G prama

COPY --from=server-deps /app/server/node_modules ./server/node_modules
COPY server/ ./server/
COPY --from=client-build /app/client/dist ./client/dist

USER prama
EXPOSE 8787
ENV PORT=8787

WORKDIR /app/server
CMD ["node", "index.js"]
