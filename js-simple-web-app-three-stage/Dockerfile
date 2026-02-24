FROM node:16-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM deps AS test
COPY . .
RUN npm run lint && npm run test

FROM node:16-alpine
RUN addgroup -S nodeuser && adduser -S nodeuser -G nodeuser

WORKDIR /app

COPY package*.json ./
COPY --from=deps /app/node_modules /app/node_modules
RUN npm prune --production

COPY server.js .

USER nodeuser

ENV NODE_ENV=production \
    PORT=3000

EXPOSE 3000

CMD ["node", "server.js"]