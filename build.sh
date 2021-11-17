cd todo-client
npm install
npm run test:pact
cd ../todo-api
go test -v -run TestProvider
