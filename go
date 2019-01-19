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

goal_run() {
  npm run develop
}

goal_build() {
  npm run build
}

goal_all() {
  goal_linter-js
  goal_linter-css
  goal_linter-text
  goal_test-js
  SITE_URL=http://test.com goal_build
}

TARGET=${1:-}

if [ -n "${TARGET}" ] && type -t "goal_$TARGET" &>/dev/null; then
  "goal_$TARGET" "${@:2}"
else
  echo "usage: $0 <goal>

  goal:

  linter-js                -- Run the linter for js files
  linter-css               -- Run the linter for css files
  linter-text              -- Run the linter for text files

  test-js                  -- Run unit tests

  run                      -- Run the development server

  build                    -- Build the bundle

  all                      -- Run all checks
"
  exit 1
fi
