import React from 'react';
import VoteButton from './VoteButton';

export default function (props) {
  return (
    <li className='Item' key={props.id}>
      <VoteButton votes={props.votes} itemId={props.id} handleVoteClick={props.handleVoteClick} />
      <span className='Item__Title'>{props.title}</span>
    </li>
  );
}
