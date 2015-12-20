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
        <button type='button' onClick={this.props.handleAddItemList}>Add List</button>
        <div className='ItemLists'>
        {
          this.props.itemLists.map((itemList) => {
            return (
              <div key={itemList.get('id')} className='ItemList__Container'>
                <div className='ItemList__RemainingVotes'>
                  Remaining Votes: {itemList.get('remainingVotes')}
                </div>
                <ItemList items={itemList.get('items')} handleVote={this.props.handleVote} />
                <AddItem listId={itemList.get('id')} onAdd={this.props.handleAddItem} />
              </div>
            );
          }).toArray()
        }
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  itemLists: React.PropTypes.instanceOf(Immutable.List),
  handleVote: React.PropTypes.func,
  handleAddItem: React.PropTypes.func,
  handleWillMount: React.PropTypes.func
};

export default Index;
