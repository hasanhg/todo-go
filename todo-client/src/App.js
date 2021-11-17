import { Button, SvgIcon, Typography } from '@mui/material';
import React from 'react';
import Task from './Task';
import { mdiPlus } from '@mdi/js';
import './App.css';
import axios from 'axios';
import NotificationBar from './NotificationBar';
import { NotificationTypes } from './const';
require('dotenv').config()

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: ["abc", "def"],
      adding: false,
      notification: {},
    }
  }

  componentDidMount() {
    this.getTasks();
  }

  getTasks = async () => {
    const resp = await axios.get(`${process.env.REACT_APP_API_URL}/list`);
    this.setState({ tasks: resp.data.tasks });
  }

  onAdd = async (description) => {
    const resp = await axios.post(`${process.env.REACT_APP_API_URL}/create`, { description }, { validateStatus: (status) => { return true; } });
    if (resp.status === 200) {
      const { tasks } = this.state;
      tasks.push(resp.data.task);

      const notification = { type: NotificationTypes.NOTIFY_SUCC, message: 'New task added' };
      this.setState({ adding: false, tasks, notification });
    }
    else this.handleErr(resp.data)
  }

  handleErr = (message) => {
    const notification = { type: NotificationTypes.NOTIFY_ERR, message };
    this.setState({ notification });
  }

  render() {
    return (
      <div className="app">
        <div className="list">
          <Typography style={{ fontWeight: 600, fontSize: 18, fontFamily: 'Roboto', color: '#333', marginBottom: 12, userSelect: 'none' }}>
            To Do
          </Typography>

          {this.state.tasks.map(task => <Task task={task} />)}

          {this.state.adding ? <Task adding={true} onAdd={this.onAdd} /> : null}
          <Button onClick={e => this.setState({ adding: true })} disabled={this.state.adding}>
            <SvgIcon fontSize='small' style={{ marginRight: 4 }}>
              <path d={mdiPlus} />
            </SvgIcon>
            Add New Task
          </Button>

          <NotificationBar notification={this.state.notification} />
        </div>
      </div>
    );
  }
}

export default App;
