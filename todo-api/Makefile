COMMIT_ID=$(shell git rev-parse --short HEAD)

all: build package

build:
	docker build -t "hasanhg/todo-api:${COMMIT_ID}" .


package:
	docker push hasanhg/todo-api:${COMMIT_ID}