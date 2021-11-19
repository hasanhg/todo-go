#!/bin/bash
set -e
#cd todo-client
#npm install
#npm run test
#npm run test:pact
#cd ../todo-api
#go test -v -run TestProvider

cd todo-api
make
