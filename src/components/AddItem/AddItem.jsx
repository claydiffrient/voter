import React from 'react';

export default class AddItem extends React.Component {

  constructor () {
    super();
    this.state = {input: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.props.onAdd({
      title: this.state.input,
      votes: 0
    });
  }

  handleChange (event) {
    this.setState({
      input: event.target.value
    });
  }

  render () {
    return (
      <div>
        <input value={this.state.input} onChange={this.handleChange} type='text' />
        <button type='button' onClick={this.handleClick}>Add Item</button>
      </div>
    );
  }
}
