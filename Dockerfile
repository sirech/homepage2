FROM node:10.9-slim as builder

WORKDIR /app

ARG SITE_URL=''

COPY . .

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# hadolint ignore=DL3008
RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential libpng-dev zlib1g-dev python \
    && yarn \
    && yarn run build \
    && yarn cache clean \
    && find public -regextype posix-basic -regex '.*\.\(js\|css\)\(.map\)\?$' -print0 | xargs -I@ sh -c "gzip -c @ > @.gz" \
    && rm -Rf node_modules \
    && apt-get remove -y build-essential libpng-dev zlib1g-dev python \
    && apt-get clean

FROM alpine:3.8

WORKDIR /app

COPY --from=builder /app/public build

# hadolint ignore=DL3025
CMD cp -a build/* public/
