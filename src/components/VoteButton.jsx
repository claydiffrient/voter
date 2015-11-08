import React from 'react';

export default function (props) {
  console.log(props)
  return (
    <div className='VoteButton'>
      <div className='VoteButton__CurrentVotes'>{props.votes}</div>
      <button className='VoteButton__Button' onClick={props.handleVoteClick}>Vote</button>
    </div>
  );
}
