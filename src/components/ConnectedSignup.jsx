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
    handleSignup: (signupDetails) => { dispatch(Actions.processSignup(signupDetails));}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
