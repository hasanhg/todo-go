#!/bin/bash
set -e

cd todo-client
npm install
make

cd ../todo-api
make
