import * as Pact from '@pact-foundation/pact';
import Client from './client';

describe('To Do Client', () => {

    const client = new Client('http://localhost', global.port);

    describe('list()', () => {

        beforeEach((done) => {
            const promises = [];

            promises.push(
                global.provider.addInteraction({
                    state: 'provider allows list to do tasks',
                    uponReceiving: 'a GET request to list to do tasks',
                    withRequest: {
                        method: 'GET',
                        path: '/list',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                        },
                    },
                    willRespondWith: {
                        status: 200,
                        body: Pact.Matchers.somethingLike({ tasks: [{ description: "task1", created_at: "2021-11-17T07:23:18.52Z", id: "84eabdb6-926a-49b6-b3a2-a8cf0fe6c115" }] })
                    }
                })
            );

            promises.push(
                global.provider.addInteraction({
                    state: 'provider allows to create task',
                    uponReceiving: 'a POST request to create a task',
                    withRequest: {
                        method: 'POST',
                        path: '/create',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            //'Content-Type': contentTypeJsonMatcher
                        },
                    },
                    willRespondWith: {
                        status: 200,
                        headers: {
                            //'Content-Type': contentTypeJsonMatcher
                        },
                        body: Pact.Matchers.somethingLike({ task: { description: "task1", created_at: "2021-11-17T07:23:18.52Z", id: "84eabdb6-926a-49b6-b3a2-a8cf0fe6c115" } })
                    }
                })
            );

            Promise.all(promises).then(() => done())
        });

        it('sends a request according to contract', (done) => {
            const listPromise = client.listTasks();
            listPromise.then(resp => {
                const list = resp.data.tasks;
                expect(list[0].id).toEqual("84eabdb6-926a-49b6-b3a2-a8cf0fe6c115");
            });

            const addPromise = client.addTask("task1");
            addPromise.then(resp => {
                const task = resp.data.task;
                expect(task.description).toEqual("task1");
            });

            Promise.all([listPromise, addPromise]).then(() => {
                global.provider.verify()
                    .then(() => done(), error => {
                        done.fail(error)
                    })
            })
        });
    });
});