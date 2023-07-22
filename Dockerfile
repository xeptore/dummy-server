FROM docker.io/library/node:20 AS builder
COPY . /app
WORKDIR /app
RUN npm -g i npm@9 && npm -g up npm && npm -g i pnpm@8
RUN pnpm i --prod

FROM gcr.io/distroless/nodejs20-debian11
COPY --from=builder /app /app
WORKDIR /app
CMD ["index.js"]
