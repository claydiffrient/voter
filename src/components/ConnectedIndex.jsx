import { connect } from 'react-redux';
import * as Actions from '../actions';
import Index from './Index';

function mapStateToProps (state) {
  return {
    items: state.get('items')
  };
}

function mapDispatchToProps (dispatch) {
  return {
    handleWillMount: () => dispatch(Actions.getItems()),
    handleAddItem: (item) => dispatch(Actions.addItem(item)),
    handleVote: (id) => dispatch(Actions.placeVote({id}))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
