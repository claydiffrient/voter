import { connect } from 'react-redux';
import * as Actions from '../actions';
import App from './App';

function mapStateToProps (state) {
  return {
    flashMessage: state.get('flashMessage')
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // handleWillMount: () => dispatch(Actions.getItems()),
    // handleAddItem: (item) => dispatch(Actions.addItem(item)),
    // handleVote: (id) => dispatch(Actions.placeVote({id}))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
