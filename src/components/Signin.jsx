import React from 'react';
import './Index.css';

class Signin extends React.Component {

  constructor () {
    super();
    this.handleSigninClick = this.handleSigninClick.bind(this);
  }

  handleSigninClick () {
    const request = {
      email: this.refs.email.value,
      password: this.refs.password.value
    };

    this.props.handleSignin(request);
  }

  handleResetClick () {
    // TODO: Make this actually reset the form
  }

  render () {
    return (
      <div>
        <div className='row center-xs'>
          <div className='col-xs-10 center-xs middle-xs'>
            <div className='Container Container--Index'>
              <div className='row center-xs'>
                <div className='col-xs-10 center-xs middle-xs'>
                  <h1>Voter</h1>
                </div>
              </div>
              <div className='row center-xs'>
                <div
                  className='col-xs-6 col-sm-2'
                >
                  <input
                    ref='email'
                    type='text'
                    placeholder='Email'
                  />
                </div>
              </div>
              <div className='row center-xs'>
                <div
                  className='col-xs-6 col-sm-2'
                >
                  <input
                    ref='password'
                    type='password'
                    placeholder='Password'
                  />
                </div>
              </div>
              <div className='row center-xs'>
                <div
                  className='col-xs-8 col-sm-4'
                >
                  <div className='Buttons'>
                    <button className='Button' type='button' onClick={this.handleSigninClick}>Login</button>
                    <button className='Button' type='button' onClick={this.handleResetClick}>Reset</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
