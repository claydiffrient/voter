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
        dispatch(Actions.getLists())
      }
    },
    handleAddItem: (item) => dispatch(Actions.addItem(item)),
    handleVote: (id) => dispatch(Actions.placeVote({id})),
    handleAddItemList: () => dispatch(Actions.addList())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
