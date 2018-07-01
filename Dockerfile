FROM node:10.5-slim as builder

WORKDIR /app

ARG SITE_URL=''

COPY . .

RUN apt-get update \
    && apt-get install -y build-essential libpng-dev zlib1g-dev python \
    && yarn \
    && yarn run build \
    && yarn cache clean \
    && find public -regextype posix-basic -regex '.*\.\(js\|css\)\(.map\)\?$' | xargs -I@ sh -c "gzip -c @ > @.gz" \
    && rm -Rf node_modules \
    && apt-get remove -y build-essential libpng-dev zlib1g-dev python \
    && apt-get clean

FROM alpine:3.7

WORKDIR /app

COPY --from=builder /app/public build

CMD cp -a build/* public/ && echo 'Build done'
