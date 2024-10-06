#!/bin/bash

set -e
set -o nounset
set -o pipefail

SCRIPT_DIR=$(cd "$(dirname "$0")" ; pwd -P)

_npm() {
  if [ -z "${CI:-}" ] ; then
    n exec auto npm "$@"
  else
    npm "$@"
  fi
}

goal_linter-js() {
  _npm run linter:js
}

goal_linter-css() {
  _npm run linter:css
}

goal_test-js() {
  _npm test
}

goal_test-e2e() {
  CYPRESS_baseUrl=${SITE_URL?Site Url is not defined} _npm run e2e -- "$@"
}

goal_security-check() {
    docker run \
           -v "$(pwd)":/zap/wrk/:rw \
           -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py \
           -t "${SITE_URL?Site Url is not defined}" \
           -c zap.conf
}

goal_lighthouse() {
    mkdir -p reports

    npx lighthouse "${SITE_URL?Site Url is not defined}" \
        --output json \
        --output html \
        --output-path="./reports/homepage" \
        --quiet \
        --chrome-flags="--headless --no-sandbox"

    node scripts/evaluateLighthouse.js
}

goal_run() {
  SITE_URL=http://localhost:8000 _npm run develop
}

goal_build() {
  # Fail if site url is not provided
  : "$SITE_URL"
  _npm run build
}

goal_clean-build() {
  rm -Rf public .cache
}

goal_all() {
  goal_linter-js
  goal_linter-css
  CI=t goal_test-js
  SITE_URL=http://test.com goal_build
}

validate-args() {
  acceptable_args="$(declare -F | sed -n "s/declare -f goal_//p" | tr '\n' ' ')"

  if [[ -z $1 ]]; then
    echo "usage: $0 <goal>"
    printf "\n$(declare -F | sed -n "s/declare -f goal_/ - /p")"
    exit 1
  fi

  if [[ ! " $acceptable_args " =~ .*\ $1\ .* ]]; then
    echo "Invalid argument: $1"
    printf "\n$(declare -F | sed -n "s/declare -f goal_/ - /p")"
    exit 1
  fi
}

CMD=${1:-}
shift || true
if validate-args "${CMD}"; then
  "goal_${CMD}"
  exit 0
fi
