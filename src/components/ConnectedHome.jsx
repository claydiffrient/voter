import { connect } from 'react-redux';
import * as Actions from '../actions';
import Home from './Home';
import page from 'page';
import { isAuthed } from '../utils';

function mapStateToProps (state) {
  return {
    items: state.get('items'),
    itemLists: state.get('itemLists')
  };
}

function mapDispatchToProps (dispatch) {
  return {
    handleWillMount: () => {
      if (!isAuthed()) {
        page('/');
      } else {
        dispatch(Actions.getLists());
        dispatch(Actions.getRemainingVotes());
      }
    },
    handleAddItem: (item) => dispatch(Actions.addItem(item)),
    handleVote: (id, listId) => dispatch(Actions.placeVote({id, listId})),
    handleAddItemList: () => dispatch(Actions.addList())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
