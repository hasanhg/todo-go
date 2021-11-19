import { Button, SvgIcon, Typography } from '@mui/material';
import React from 'react';
import Task from './Task';
import { mdiPlus } from '@mdi/js';
import './App.css';
import axios from 'axios';
import NotificationBar from './NotificationBar';
import { NotificationTypes } from './const';
import Client from './client';

require('dotenv').config()

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: this.props.tasks,
      adding: false,
      notification: {},
    }

    this.mounted = false;
    this.client = new Client(null, null, process.env.NODE_ENV);
  }

  componentDidMount() {
    this.mounted = true;
    this.getTasks();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getTasks = async () => {
    const resp = await this.client.listTasks();
    if (this.mounted) this.setState({ tasks: resp.data.tasks });
  }

  onCancel = () => {
    if (this.mounted) this.setState({ adding: false });
  }

  onAdd = async (description) => {
    const resp = await this.client.addTask(description);
    if (resp.status === 200) {
      const { tasks } = this.state;
      tasks.push(resp.data.task);

      const notification = { type: NotificationTypes.NOTIFY_SUCC, message: 'New task added' };
      if (this.mounted) this.setState({ adding: false, tasks, notification });
    }
    else this.handleErr(resp.data)
  }

  handleErr = (message) => {
    const notification = { type: NotificationTypes.NOTIFY_ERR, message };
    if (this.mounted) this.setState({ notification });
  }

  render() {
    const tasks = this.state.tasks || [];
    return (
      <div className="app">
        <div className="list">
          <Typography style={{ fontWeight: 600, fontSize: 18, fontFamily: 'Roboto', color: '#333', marginBottom: 12, userSelect: 'none' }}>
            To Do
          </Typography>

          {tasks.map((task, i) => <Task task={task} key={i} />)}

          {this.state.adding ? <Task adding={true} onAdd={this.onAdd} onCancel={this.onCancel} /> : null}
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
