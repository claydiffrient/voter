import React from 'react';
import './Index.css';
import ItemList from './ItemList';
import AddItem from './AddItem';
import Immutable from 'immutable';

class Index extends React.Component {

  componentWillMount () {
    this.props.handleWillMount();
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
                  <a
                    className='Button ButtonLink'
                    href='/signup'
                  >
                    Signup
                  </a>
                </div>
                <div
                  className='col-xs-6 col-sm-2'
                >
                  <a
                    className='Button ButtonLink'
                    href='/signin'
                  >
                    Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*<ItemList items={this.props.items} handleVote={this.props.handleVote} /> */}
        {/*<AddItem onAdd={this.props.handleAddItem} /> */}
      </div>
    );
  }
}

Index.propTypes = {
  itemList: React.PropTypes.instanceOf(Immutable.List),
  handleVote: React.PropTypes.func,
  handleAddItem: React.PropTypes.func,
  handleWillMount: React.PropTypes.func
};

export default Index;
