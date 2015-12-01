import React from 'react';
import FlashMessageHolder from './FlashMessageHolder';
import './App.css';
import 'flexboxgrid/dist/flexboxgrid.css';

class App extends React.Component {
  render () {
    return (
      <div className='App'>
        <FlashMessageHolder {...this.props.flashMessage.toJS()} />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.arrayOf(React.PropTypes.element)
  ]),
  flashMessage: React.PropTypes.object.isRequired
};

export default App;
