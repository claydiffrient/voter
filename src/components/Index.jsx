import React from 'react';
import './Index.css';
import ItemList from './ItemList';
import AddItem from './AddItem';

export default function (props) {
  return (
    <div>
      <ItemList items={props.items} handleVote={props.handleVote} />
      <AddItem onAdd={props.handleAddItem} />
    </div>
  );
}
