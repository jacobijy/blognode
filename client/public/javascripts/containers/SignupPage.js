import { connect } from 'react-redux'
import SignupPanel from '../view/sign/signuppanel';

const mapStateToProps = (state) => {
  const { items } = state.signup;
  let { data = false } = items;
  return {
    redirectToLogin: data,
    SignMessage: items.msg
  }
}

export default connect(mapStateToProps)(SignupPanel)