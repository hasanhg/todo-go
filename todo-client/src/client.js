import axios from "axios";

class Client {
  constructor(url, port, env) {
    this.env = env;
    this.apiURL = url && port ? `${url}:${port}` : window.env.API_URL;
  }

  listTasks = () => {
    return this.fetch(`${this.apiURL}/list`, "GET")
  }

  addTask = (description) => {
    return this.fetch(`${this.apiURL}/create`, "POST", { description })
  }

  fetch = (url, method, data) => {
    if (this.env === 'test') return new Promise((resolve, reject) => resolve({ data: 'Test environment' }));
    return axios.request({ url, method, data, validateStatus: (status) => true })
  }
}

export default Client;