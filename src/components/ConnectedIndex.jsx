import { connect } from 'react-redux';
import * as Actions from '../actions';
import Index from './Index';
import page from 'page';
import { isAuthed } from '../utils';

function mapStateToProps (state) {
  return {
    itemLists: state.get('itemLists')
  };
}

function mapDispatchToProps (dispatch) {
  return {
    handleWillMount: () => {
      if (isAuthed()) {
        page('/home');
      }
    },
    handleAddItem: (item) => dispatch(Actions.addItem(item)),
    handleVote: (id) => dispatch(Actions.placeVote({id}))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
