import React from 'react';
import './Index.css';

class Signup extends React.Component {

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
                    <button className='Button' type='button'>Submit</button>
                    <button className='Button' type='button'>Reset</button>
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

// Index.propTypes = {
//   items: React.PropTypes.instanceOf(Immutable.List),
//   handleVote: React.PropTypes.func,
//   handleAddItem: React.PropTypes.func,
//   handleWillMount: React.PropTypes.func
// };

export default Signup;
