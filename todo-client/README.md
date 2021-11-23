## Getting Started

This is the front-end of To Do Go application. It is written in React.js,
and can be run locally to create test environment.

### Prerequisites
There are a few requirements to be done in order to run the server.
* NodeJS
* npm

### Installation
Below is the instructions how to prepare testing environment.
1. Clone the repo
    ```sh
    git clone https://github.com/hasanhg/todo-go
    ```

2. Change directory to Client folder
    ```sh
    cd todo-go/todo-client
    ```

3. Create .env file including API URL. Default is the following
    ```
    REACT_APP_API_URL=http://localhost:80
    ```

4. Run Web application
    ```sh
    yarn && yarn start
    ```
    
### Consumer Test
You can generate pact files in order to use them on Provider Test.

1. Change directory to Client folder
    ```sh
    cd todo-go/todo-client
    ```

2. Run TestProvider
    ```sh
    npm run test:pact
    ```

### Acceptance Test
1. Change directory to API folder
    ```sh
    cd todo-go/todo-api
    ```

2. Run unit tests
    ```sh
    npm run test
    ```
