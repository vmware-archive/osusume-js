#!/bin/bash

set -e -x

pushd osusume-js
  npm install
  npm test
  npm run build
popd