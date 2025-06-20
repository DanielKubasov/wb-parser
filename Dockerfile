FROM node:20-alpine AS base

FROM base AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm install --production

FROM base AS build

WORKDIR /app

COPY . .

COPY --from=dependencies /app/node_modules ./node_modules

RUN npm run build

FROM base AS production

WORKDIR /app

COPY --from=build /app/dist ./dist

COPY --from=build /app/node_modules ./node_modules

RUN chmod +x ./startup.sh

CMD ["./startup.sh"]

