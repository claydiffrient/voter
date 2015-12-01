import React from 'react';

class FlashMessageHolder extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      isDisplayed: props.isDisplayed
    };
  }

  render () {
    if (this.state.isDisplayed) {
      if (this.props.isError) {
        return (
          <div>Test Error</div>
        );
      } else {
        return (
          <div>Test Message</div>
        );
      }
    } else {
      return null;
    }
  }
};

export default FlashMessageHolder;
