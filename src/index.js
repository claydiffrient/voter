import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export default class Index extends React.Component {
  render () {
    return (
      <div>
        Testing again
      </div>
    );
  }
};

ReactDOM.render(<Index />, document.getElementById('main'));
