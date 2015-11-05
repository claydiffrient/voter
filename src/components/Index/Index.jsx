import React from 'react';
import './Index.css';
import ItemList from '../ItemList/ItemList';
import AddItem from '../AddItem/AddItem';

export default function (props) {
  return (
    <div>
      <ItemList items={props.items} />
      <AddItem onAdd={props.handleAddItem} />
    </div>
  );
}
