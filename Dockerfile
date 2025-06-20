FROM node:20-alpine AS base

FROM base AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm install

FROM base AS build

WORKDIR /app

COPY . .

COPY --from=dependencies /app/node_modules ./node_modules

RUN npm run build

FROM base AS production

WORKDIR /app

COPY --from=build /app/dist ./dist

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/startup.sh ./startup.sh

COPY --from=build /app/migrations ./migrations

COPY --from=build /app/secrets ./secrets

COPY --from=build /app/knexfile.ts ./knexfile.ts

RUN chmod +x ./startup.sh

CMD ["./startup.sh"]

