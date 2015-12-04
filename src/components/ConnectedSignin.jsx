import { connect } from 'react-redux';
import * as Actions from '../actions';
import Signin from './Signin';

function mapStateToProps (state) {
  return {
    user: state.get('user')
  };
}

function mapDispatchToProps (dispatch) {
  return {
    handleSignin: (signinDetails) => { dispatch(Actions.processSignin(signinDetails));}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
