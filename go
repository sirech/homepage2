#!/bin/bash

set -e
set -o nounset
set -o pipefail

SCRIPT_DIR=$(cd "$(dirname "$0")" ; pwd -P)

goal_linter-js() {
  npm run linter:js
}

goal_linter-css() {
  npm run linter:css
}

goal_linter-text() {
  npm run linter:text
}

goal_test-js() {
  npm test
}

goal_test-e2e() {
  CYPRESS_baseUrl=${SITE_URL?Site Url is not defined} npm run e2e -- "$@"
}

goal_run() {
  SITE_URL=http://localhost:8000 npm run develop
}

goal_build() {
  npm run build
}

goal_all() {
  goal_linter-js
  goal_linter-css
  goal_linter-text
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
