import React from 'react';

export default function (props) {
  return (
    <ul>
      {
        props.items.map((item) => {
          return (
            <li key={item.id}>
              <span>{item.title}</span>
              <span>Num Votes: {item.votes}</span>
            </li>
          );
        })
      }
    </ul>
  );
}
