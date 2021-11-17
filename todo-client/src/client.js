import axios from "axios";

class Client {
  constructor(url, port) {
    this.apiURL = url && port ? `${url}:${port}` : process.env.REACT_APP_API_URL;
  }

  listTasks = () => {
    if (process.env.NODE_ENV === 'test') return new Promise((resolve, reject) => resolve({ data: 'Test environment' }));
    return axios.get(`${this.apiURL}/list`);
  }

  addTask = (description) => {
    if (process.env.NODE_ENV === 'test') return new Promise((resolve, reject) => resolve({ data: 'Test environment' }));
    return axios.post(`${this.apiURL}/create`, { description }, { validateStatus: (status) => { return true; } });
  }
}

export default Client;