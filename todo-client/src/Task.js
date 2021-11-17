import React from 'react';
import { Button, TextField } from '@mui/material';
import './Task.css';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
    }
  }

  onAdd = () => {
    this.props.onAdd(this.state.description);
    this.setState({ description: '' });
  }

  renderAddField = () => {
    return (
      <div style={{ textAlign: 'right' }}>
        <TextField
          value={this.state.description}
          onChange={e => this.setState({ description: e.target.value })}
          fullWidth
          margin='none'
          multiline
        />
        <Button variant='contained' color='primary' style={{ padding: 4, marginTop: 8 }} onClick={this.onAdd}>
          Add
        </Button>
      </div>
    );
  }

  render() {
    return (
      <div className="task">
        {this.props.adding ? this.renderAddField() : this.props.task.description}
      </div>
    );
  }
}

export default Task;
