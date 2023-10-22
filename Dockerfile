FROM node:18-alpine3.16

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build


ENV NODE_ENV production

EXPOSE 3000

ENV PORT 3000

CMD npm run migstart