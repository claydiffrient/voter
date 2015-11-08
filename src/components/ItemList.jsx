import React from 'react';
import Item from './Item';

export default function (props) {
  return (
    <ul>
      {
        props.items.map((item) => {
          return (
            <Item id={item.get('id')} votes={item.get('votes')} title={item.get('title')} handleVoteClick={props.handleVote.bind(null, item.id)} />
          );
        })
      }
    </ul>
  );
}
