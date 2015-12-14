import { List, Map } from 'immutable';

const initialState = Map({
  items: List([]),
  itemLists: List([]),
  remainingVotes: 10,
  flashMessage: Map({
    error: false,
    message: '',
    time: Date.now()
  }),
  user: Map({
    email: '',
    name: ''
  })
});

export default initialState;
