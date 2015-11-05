import React from 'react';

export default function (props) {
  return (
    <div>
      {
        props.items.map((item) => {
          return (
            <div>
              <span>{item.title}</span>
              <span>Num Votes: {item.votes}</span>
            </div>
          );
        })
      }
    </div>
  );
}
