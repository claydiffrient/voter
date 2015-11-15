import React from 'react';
import uuid from 'uuid';

export default class AddItem extends React.Component {

  constructor () {
    super();
    this.state = {input: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleClick () {
    this.props.onAdd({
      title: this.state.input,
      votes: 0,
      id: uuid.v1()
    });
    this.setState({
      input: ''
    });
  }

  handleChange (event) {
    this.setState({
      input: event.target.value
    });
  }

  handleKeyPress (event) {
    if (event.key === 'Enter') {
      this.handleClick();
    }
  }

  render () {
    return (
      <div>
        <input
          value={this.state.input}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          type='text' />
        <button type='button' onClick={this.handleClick}>Add Item</button>
      </div>
    );
  }
}
