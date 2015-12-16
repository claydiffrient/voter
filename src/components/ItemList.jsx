import React from 'react';
import Item from './Item';

export default function (props) {
  return (
    <ul>
      {
        props.items.map((item) => {
          const id = item.get('id');
          return (
            <Item key={id} id={id} votes={item.get('votes')} title={item.get('title')} handleVoteClick={props.handleVote.bind(null, id, item.get('listId'))} />
          );
        }).toArray()
      }
    </ul>
  );
}
