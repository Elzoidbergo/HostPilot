# Dockerfile
FROM node:20-alpine
WORKDIR /app

# Install pnpm & deps
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source & build
COPY . .
RUN pnpm exec prisma generate
RUN pnpm build

# Expose & run
EXPOSE 3000
CMD ["pnpm", "start"]
