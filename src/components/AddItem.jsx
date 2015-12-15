import React from 'react';
import classnames from 'classnames';
import './AddItem.css';

export default class AddItem extends React.Component {

  constructor () {
    super();
    this.state = {input: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleClick () {
    if (this.state.input.length) {
      this.props.onAdd({
        title: this.state.input,
        listId: this.props.listId
      });
      this.setState({
        input: '',
        error: false
      });
    } else {
      this.setState({
        error: true
      });
    }
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
    const inputClasses = classnames({
      'AddItem__Input': true,
      'AddItem__Input--error': this.state.error
    });

    return (
      <div>
        <input
          className={inputClasses}
          value={this.state.input}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          type='text'
          aria-invalid={this.state.error}
        />
        <button type='button' onClick={this.handleClick}>Add Item</button>
      </div>
    );
  }
}
