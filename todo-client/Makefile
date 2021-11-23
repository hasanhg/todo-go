COMMIT_ID=$(shell git rev-parse --short HEAD)

all: clean test build package

build:
	docker build -t "hasanhg/todo-client:${COMMIT_ID}" .

package:
	docker push hasanhg/todo-client:${COMMIT_ID}

clean:
	rm -rf ./build

test:
	npm run test
	npm run test:pact