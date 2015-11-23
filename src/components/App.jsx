import React from 'react';
import './App.css';
import 'flexboxgrid/dist/flexboxgrid.css';

class App extends React.Component {
  render () {
    return (
      <div className='App'>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.arrayOf(React.PropTypes.element)
  ])
};

export default App;
