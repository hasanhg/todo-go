FROM golang:1.16.10-alpine3.13
WORKDIR /go/src/todo-go/todo-api

COPY . ./
RUN go build

FROM alpine:latest
COPY --from=0 /go/src/todo-go/todo-api/todo-api /go/bin/todo-api
CMD ["/go/bin/todo-api"]
