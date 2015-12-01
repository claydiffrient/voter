import { connect } from 'react-redux';
import * as Actions from '../actions';
import Signup from './Signup';

function mapStateToProps (state) {
  return {
    user: state.get('user')
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // handleWillMount: () => dispatch(Actions.getItems()),
    // handleAddItem: (item) => dispatch(Actions.addItem(item)),
    // handleVote: (id) => dispatch(Actions.placeVote({id}))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
