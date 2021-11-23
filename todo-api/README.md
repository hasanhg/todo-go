## Getting Started

This is the back-end of To Do Go application. It is written in Go,
and can be run locally to create test environment.

### Prerequisites
There are a few requirements to be done in order to run the server.
* Go
* Redis
* Pact-Go (Testing Only)
    - Make sure that you have up to date CLI Tools for Pact. You can download it [here](https://github.com/pact-foundation/pact-ruby-standalone/releases)
    or skip provider testing. For detailed information, please refer to [pact-go installation guide](https://github.com/pact-foundation/pact-go#installation).

### Installation
Below is the instructions how to prepare testing environment.
1. Clone the repo
    ```sh
    git clone https://github.com/hasanhg/todo-go
    ```

2. Change directory to API folder
    ```sh
    cd todo-go/todo-api
    ```

3. Create .env file including Redis credentials. Default is the following
    ```
    REDIS_HOST=127.0.0.1
    REDIS_PORT=6379
    REDIS_PASSWORD=
    REDIS_SCHEME=redis
    ```

4. Run API service
    ```sh
    go run main.go
    ```

5. You are ready to Go :-)    🎉🎉🎉
    * The server will listen on port 80 by default.
    
### Provider Test
Assuming consumer driven pact files are stored at the path ``../todo-client/pacts``

1. Change directory to API folder
    ```sh
    cd todo-go/todo-api
    ```

2. Run TestProvider
    ```sh
    go test -v -run TestProvider
    ```

### Unit Test
1. Change directory to API folder
    ```sh
    cd todo-go/todo-api
    ```

2. Run unit tests
    ```sh
    go test ./tests
    ```
