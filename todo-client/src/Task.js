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
          fullWidth
          autoFocus
          multiline
          margin='none'
          placeholder='Type your task description'
          value={this.state.description}
          onChange={e => this.setState({ description: e.target.value })}
          onKeyDown={e => {
            if (e.key === 'Escape') {
              this.props.onCancel();
            }
            else if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              this.onAdd();
            }
          }}
        />
        <div style={{ marginTop: 8 }}>
          <Button variant='contained' color='error' style={{ padding: 4, marginRight: 8, minWidth: 72 }} onClick={this.props.onCancel}>
            Cancel
          </Button>
          <Button variant='contained' color='primary' style={{ padding: 4, minWidth: 72 }} onClick={this.onAdd}>
            Add
          </Button>
        </div>
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
