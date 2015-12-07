import React from 'react';
import './Index.css';
import ItemList from './ItemList';
import AddItem from './AddItem';
import Immutable from 'immutable';

class Index extends React.Component {

  componentWillMount () {
    this.props.handleWillMount();
  }

  render () {
    return (
      <div>
        <ItemList items={this.props.items} handleVote={this.props.handleVote} />
        <AddItem onAdd={this.props.handleAddItem} />
      </div>
    );
  }
}

Index.propTypes = {
  items: React.PropTypes.instanceOf(Immutable.List),
  handleVote: React.PropTypes.func,
  handleAddItem: React.PropTypes.func,
  handleWillMount: React.PropTypes.func
};

export default Index;
