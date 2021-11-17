import axios from "axios";

class Client {
  constructor(url, port) {
    this.apiURL = process.env.NODE_ENV === 'test' ? `${url}:${port}` : process.env.REACT_APP_API_URL;
  }

  listTasks = () => {
    return axios.get(`${this.apiURL}/list`);
  }

  addTask = (description) => {
    return axios.post(`${this.apiURL}/create`, { description }, { validateStatus: (status) => { return true; } });
  }
}

export default Client;